import gql from "graphql-tag";

export type SendMessageData = boolean;
export type SendMessageVariables = {
  messageRoomId: string;
  message: string;
};
export const SEND_MESSAGE = gql`
  mutation sendMessage($messageRoomId: ID!, $message: MessageInput!) {
    sendMessage(messageRoomId: $messageRoomId, message: $message)
  }
`;
