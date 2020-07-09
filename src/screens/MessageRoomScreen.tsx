import React, { useState, useEffect } from "react";
import { Layout } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { ChatHeader } from "../components/Chat";
import { MessageRoomNavigationProp } from "../navigation/types";
import { GiftedChat } from "react-native-gifted-chat";
import { useSubscription, useMutation, useQuery } from "@apollo/react-hooks";
import {
  SEND_MESSAGE,
  SendMessageData,
  SendMessageVariables,
} from "../graphql/mutations";
import {
  FULLUSER,
  FullUserData,
  FullUserVariables,
  MESSAGE_SENT,
  MessageSentData,
  MessageSentVariables,
  GET_MESSAGE_ROOM,
  GetMessageRoomData,
  GetMessageRoomVariables,
  MessageType,
} from "../graphql/queries";
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = MessageRoomNavigationProp;

const MessageRoomScreen: React.FC<Props> = (props) => {
  const { route, navigation } = props;
  const { group } = route.params;
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [sendMessage] = useMutation<SendMessageData, SendMessageVariables>(
    SEND_MESSAGE
  );
  const user = useQuery<FullUserData, FullUserVariables>(FULLUSER);
  const messageRoom = useQuery<GetMessageRoomData, GetMessageRoomVariables>(
    GET_MESSAGE_ROOM,
    { variables: { id: group.messageRoom }, fetchPolicy: "network-only" }
  );
  useSubscription<MessageSentData, MessageSentVariables>(MESSAGE_SENT, {
    variables: {
      messageRoomId: group.messageRoom,
    },
    onSubscriptionData: (all) => {
      const data = all.subscriptionData.data;
      setMessages(
        GiftedChat.append(messages, [data?.messageSent.message as MessageType])
      );
    },
  });

  useEffect(() => {
    if (messageRoom.data) {
      const oldMessages = messageRoom.data.getMessageRoom.messages;
      oldMessages.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setMessages(oldMessages);
    }
  }, [messageRoom.data]);

  const onSend = (messages: any) => {
    sendMessage({
      variables: {
        messageRoomId: group.messageRoom,
        message: messages[0],
      },
    });
  };
  return (
    <SafeAreaView style={styles.container}>

      <Layout level="2" style={styles.container}>
        <ChatHeader title={group.event.title} image={group.event.images[0]} />
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: user.data?.me.id as string,
            name: user.data?.me.username,
            avatar: user.data?.me.avatar,
          }}
          renderUsernameOnMessage={true}
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MessageRoomScreen;
