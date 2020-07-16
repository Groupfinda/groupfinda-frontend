import gql from "graphql-tag";

type Group = {
  id: string;
  messageRoom: string;
  members: Array<{
    id: string;
    username: string;
    firstName: string;
    avatar: string;
  }>;
  event: {
    title: string;
    dateOfEvent: Date;
    images: string[];
  };
};

export type GetMyGroupsVariables = {};
export type GetMyGroupsData = {
  me: {
    id: string;
    groups: Array<Group>;
  };
};
export const GET_MY_GROUPS = gql`
  query {
    me {
      id
      groups {
        id
        messageRoom
        members {
          id
          username
          firstName
          avatar
        }
        event {
          title
          dateOfEvent
          images
        }
      }
    }
  }
`;

export type MessageType = {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  createdAt: Date;
  text: string;
};

export type GetMessageRoomVariables = {
  id: string;
};
export type GetMessageRoomData = {
  getMessageRoom: {
    messages: Array<MessageType>;
    group: Group;
  };
};
export const GET_MESSAGE_ROOM = gql`
  query getMessageRoom($id: ID!) {
    getMessageRoom(id: $id) {
      messages {
        _id
        user {
          _id
          name
          avatar
        }
        createdAt
        text
      }
      group {
        id
        messageRoom
        members {
          id
          username
          firstName
          avatar
        }
        event {
          title
          dateOfEvent
          images
        }
      }
    }
  }
`;

export type MessageSentData = {
  messageSent: {
    room: string;
    message: MessageType;
  };
};

export type MessageSentVariables = {
  messageRoomId: string;
};
export const MESSAGE_SENT = gql`
  subscription messageSent($messageRoomId: String!) {
    messageSent(messageRoomId: $messageRoomId) {
      message {
        text
        _id
        createdAt
        user {
          _id
          avatar
          name
        }
      }
      room
    }
  }
`;
