import gql from "graphql-tag";

export const SAVE_ANSWER = gql`
    mutation submitRangeQuestion(
        $order: Int!
        $value: Int!
    ) {
        submitRangeQuestion(
            order: $order
            value: $value
        )
    }
`;