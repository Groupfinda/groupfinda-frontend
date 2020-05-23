import gql from "graphql-tag";

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const USER = gql`
  query {
    me {
      id
      firstName
      lastName
      username
      email
    }
  }
`;

export const FULLUSER = gql`
  query {
    me {
      id
      firstName
      lastName
      username
      email
      gender
      avatar
      birthday
      location
      profile
    }
  }
`;