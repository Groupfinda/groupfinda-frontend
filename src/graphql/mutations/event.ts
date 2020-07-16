import gql from "graphql-tag";

export type CreateEventData = {
  id: string;
};

export type CreateEventVariables = {
  id: string | undefined;
  title: string;
  description: string;
  dateOfEvent: Date;
  recurringMode: boolean;
  dateLastRegister: Date;
  images: string[];
  private: boolean;
  groupSize: number;
  category: string[];
  locationOn: boolean;
  location: {
    postalCode: string;
    address: string;
  };
};
export const CREATE_EVENT = gql`
  mutation createEvent(
    $id: ID
    $title: String!
    $description: String!
    $dateOfEvent: Date!
    $recurringMode: Boolean!
    $dateLastRegister: Date!
    $images: [String]!
    $private: Boolean!
    $groupSize: Int!
    $category: [String]!
    $locationOn: Boolean!
    $location: LocationInput!
  ) {
    createEvent(
      id: $id
      title: $title
      description: $description
      dateOfEvent: $dateOfEvent
      recurringMode: $recurringMode
      dateLastRegister: $dateLastRegister
      images: $images
      private: $private
      groupSize: $groupSize
      category: $category
      locationOn: $locationOn
      location: $location
    ) {
      id
    }
  }
`;

export type RegisterEventVariables = {
  eventId: string;
};
export type RegisterEventData = {
  registerEvent: {
    id: string;
  };
};
export const REGISTER_EVENT = gql`
  mutation registerEvent($eventId: String!) {
    registerEvent(eventId: $eventId) {
      id
    }
  }
`;

export const UNREGISTER_EVENT = gql`
  mutation unregisterEvent($eventId: String!) {
    unregisterEvent(eventId: $eventId) {
      id
    }
  }
`;

export type ViewEventVariables = {
  eventId: string;
  type: "LIKE" | "DISLIKE";
};

export type ViewEventData = {
  viewEvent: boolean;
};
export const VIEW_EVENT = gql`
  mutation viewEvent($eventId: String!, $type: String!) {
    viewEvent(eventId: $eventId, type: $type)
  }
`;
