import React, { useState, useEffect } from "react";
import { Layout, Text, Drawer, Divider, DrawerItem, Avatar } from "@ui-kitten/components";
import { StyleSheet, Animated, View } from "react-native";
import { ChatHeader, SideMenu } from "../components/Chat";
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
  const [menu, setMenu] = useState<boolean>(false);
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


  const Menu = (<Layout style={styles.container}>
    <Layout style={styles.sideHeader}>
      <Text category="h5" status="primary">Participants</Text>
    </Layout>
    <Divider />

    <Drawer>
      {group.members.map(member => (
        <DrawerItem
          key={member.id}
          title={() => (<View style={{ flex: 1, alignItems: "flex-start", marginLeft: 20 }}>
            <Text category="h6">{member.firstName}</Text>
          </View>)}
          accessoryLeft={() => <Avatar source={{ uri: member.avatar }} />} />
      ))}

    </Drawer>


  </Layout>)
  return (


    <SafeAreaView style={styles.container}>

      <SideMenu
        menu={Menu}
        isOpen={menu}
        menuPosition="right"
        onChange={(prev) => setMenu(prev)}
        //@ts-ignore
        animationFunction={(prop, value) => Animated.spring(prop, {
          toValue: value,
          friction: 8,
          useNativeDriver: true
        })}>
        <Layout level="2" style={styles.container}>
          <ChatHeader title={group.event.title} image={group.event.images[0]} onImagePress={() => setMenu(true)} />
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
      </SideMenu>
    </SafeAreaView>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sideHeader: {
    alignItems: "center",
    padding: 20
  },
});

export default MessageRoomScreen;
