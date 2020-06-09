import gql from "graphql-tag";

export const ME = gql`
  query {
    me {
      id
      username
      role
      isVerified
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
      location
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
      preferences {
        lowerAge
        upperAge
        maxDistance
      }
      profile {
        userHobbies
        userFaculty
        userYearOfStudy
      }
    }
  }
`;
