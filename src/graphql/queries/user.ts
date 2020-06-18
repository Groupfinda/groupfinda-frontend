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

export type FullUserVariables = {};
export type FullUserData = {
  me: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    gender: string;
    avatar: string;
    birthday: Date;
    location: string;
    preferences: {
      lowerAge: number;
      upperAge: number;
      maxDistance: number;
    };
    profile: {
      userHobbies: string[];
      userFaculty: string[];
      userYearOfStudy: string[];
    };
  };
};
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
