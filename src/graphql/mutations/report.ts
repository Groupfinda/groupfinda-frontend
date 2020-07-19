import gql from "graphql-tag";

export const SUBMIT_REPORT = gql`
    mutation submitReport (
        $title: String!
        $category: String!
        $description: String!
    ) {
        submitReport(
            title: $title
            category: $category
            description: $description
        )
    }
`;