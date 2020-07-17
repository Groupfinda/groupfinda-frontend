import gql from "graphql-tag";

export type MeData = {
  me: {
    id: string;
    username: string;
    newUser: boolean;
    role: string;
    isVerified: boolean;
    expoToken: string;
  }
}
export const ME = gql`
  query {
    me {
      id
      username
      role
      isVerified
      newUser
      expoToken
    }
  }
`;

export const USER = gql`
  query {
    me {
      id
      avatar
      firstName
      lastName
      username
      location
      groups {
        id
      }
      profile {
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
    getUserEvents {
      id
      title
      dateOfEvent
    }
  }
`;

export const OTHERUSER = gql`
  query fetchUser($id: ID!) {
    fetchUser(userId: $id) {
      id
      avatar
      firstName
      lastName
      username
      location
      groups {
        id
      }
      profile {
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
