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
