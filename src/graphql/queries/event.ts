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

export const singleEvent = gql`
    query Event($eventId: ID!) {
        getEvent (eventId: $eventId) {
            id
            title
            description
            owner {
                avatar
                username
                firstName
                lastName
            }
            dateOfEvent
            dateLastRegister
            images
            groupSize
            category
            registeredUsers {
                firstName
                lastName
                avatar
            }
            groups
            eventCode
            location {
                address
                postalCode
            }
        }
    }
`;

export const searchEventByTerm = gql`
    query Event($searchTerm: String!) {
        searchEvent (searchTerm: $searchTerm) {
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