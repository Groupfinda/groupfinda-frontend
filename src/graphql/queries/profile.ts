import gql from "graphql-tag";

export const getUserQuestions = gql`
  query {
    getUserProfile {
      id
      rangeQuestions
    }
    getAllRangeQuestions {
      order
      content
    }
  }
`;

export const getUserLikes = gql`
  query {
    getUserProfile {
      id
      eventsLiked {
        id
      }
    }
  }
`;
