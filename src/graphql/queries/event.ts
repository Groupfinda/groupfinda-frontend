import gql from "graphql-tag";

export const upcomingEvents = gql`
  query {
    searchEvent {
      id
      title
      description
      dateOfEvent
      dateLastRegister
      images
      private
      groupSize
      locationOn
    }
  }
`;

export const singleEvent = gql`
  query Event($eventId: ID!) {
    getEvent(eventId: $eventId) {
      id
      title
      description
      owner {
        avatar
        username
        firstName
        lastName
      }
      dateOfEvent
      dateLastRegister
      images
      groupSize
      category
      registeredUsers {
        id
        firstName
        lastName
        avatar
      }
      groups
      eventCode
      location {
        address
        postalCode
      }
    }
  }
`;

export const searchEventByTerm = gql`
  query Event($searchTerm: String!) {
    searchEvent(searchTerm: $searchTerm) {
      id
      title
      description
      dateOfEvent
      dateLastRegister
      images
      private
      groupSize
      locationOn
    }
  }
`;

export const searchEventByCode = gql`
  query searchEventByCode($eventCode: String!) {
    searchEvent(eventCode: $eventCode) {
      id
    }
  }
`;

export type SearchEventCodeData = Array<{
  id: string;
}>;
export type SearchEventCodeVariables = {
  eventCode: string;
};

export type GetSwipeEventsVariables = {};
export type GetSwipeEventsType = {
  id: string;
  title: string;
  description: string;
  dateOfEvent: Date;
  dateLastRegister: Date;
  images: string[];
  groupSize: number;
  category: string[];
  eventCode: string;
  location: {
    address: string;
    postalCode: string;
  };
  owner: {
    username: string;
    avatar: string;
  };
};
export type GetSwipeEventsData = {
  getSwipeEvents: GetSwipeEventsType[];
};
export const GET_SWIPE_EVENTS = gql`
  query {
    getSwipeEvents {
      id
      title
      description
      dateOfEvent
      dateLastRegister
      images
      groupSize
      category
      eventCode
      location {
        address
        postalCode
      }
      owner {
        username
        avatar
      }
    }
  }
`;
