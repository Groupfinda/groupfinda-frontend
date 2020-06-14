import gql from 'graphql-tag';

export const getUserQuestions = gql`
    query {
        getUserProfile {
            rangeQuestions
        }
        getAllRangeQuestions{
            order
            content
        }
    }
`;

export const getUserLikes = gql`
    query {
        getUserProfile {
            eventsLiked {
                id
            }
        }
    }
`
