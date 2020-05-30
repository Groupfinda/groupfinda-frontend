import gql from "graphql-tag";

export type CreateEventData = {
  id: string;
};

export type CreateEventVariables = {
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
