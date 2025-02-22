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
      category
    }
  }
`;

export type NewEventVariables = {
  eventId: string;
};

export type NewEventData = {
  getEvent: {
    id: string;
    title: string;
    description: string;
    eventCode: string;
  };
};
export const NEW_EVENT = gql`
  query getEvent($eventId: ID) {
    getEvent(eventId: $eventId) {
      id
      title
      description
      eventCode
    }
  }
`;

export type GetEditEventData = {
  getEvent: {
    id: string;
    title: string;
    description: string;
    dateOfEvent: string;
    dateLastRegister: string;
    images: string[];
    groupSize: number;
    category: string[];
    location: {
      address: string;
      postalCode: string;
    };
    private: boolean;
  };
};
export type GetEditEventVariables = {
  eventId: string;
};

export const GET_EDIT_EVENT = gql`
  query getEvent($eventId: ID) {
    getEvent(eventId: $eventId) {
      id
      title
      description
      dateOfEvent
      dateLastRegister
      images
      groupSize
      category
      location {
        address
        postalCode
      }
      private
    }
  }
`;
export const singleEvent = gql`
  query Event($eventId: ID) {
    getEvent(eventId: $eventId) {
      id
      title
      description
      owner {
        id
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
      eventCode
      location {
        address
        postalCode
      }
    }
    getUserGroup(eventId: $eventId)
  }
`;

export type searchEventType = {
  id: string;
  title: string;
  description: string;
  dateOfEvent: Date;
  dateLastRegister: Date;
  images: string[];
  private: boolean;
  groupSize: number;
  locationOn: boolean;
  category: string[];
};

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
      category
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
    id: string;
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
        id
        username
        avatar
      }
    }
  }
`;
