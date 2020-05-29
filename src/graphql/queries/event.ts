import gql from "graphql-tag";

export const upcomingEvents = gql`
    query {
        searchEvent {
            id
            title
            description
            dateOfEvent
            dateLastRegister
            images
            private
            groupSize
            locationOn
        }
    }
`;