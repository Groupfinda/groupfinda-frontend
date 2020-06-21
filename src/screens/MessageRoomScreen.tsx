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
    { variables: { id: group.messageRoom } }
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
      setMessages(messageRoom.data.getMessageRoom.messages.reverse());
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
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MessageRoomScreen;
