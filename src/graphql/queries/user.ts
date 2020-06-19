import gql from "graphql-tag";

export const ME = gql`
  query {
    me {
      id
      username
      role
      isVerified
      newUser
    }
  }
`;

export const USER = gql`
  query {
    me {
      firstName
      lastName
      username
      location
      groups
      profile{
        eventsRegistered {
          id
          title
          dateOfEvent
        }
        eventsLiked {
          id
          title
          dateOfEvent
        }
        eventsDisliked {
          id
        }
        userHobbies
        userFaculty
        userYearOfStudy
      }
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
