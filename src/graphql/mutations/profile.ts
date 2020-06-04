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

export const UPDATE_PROFILE = gql `
    mutation updateProfileField(
        $userHobbies: [String]
        $userFaculty: String
        $userYearOfStudy: Int
    ) {
        updateProfileField(
            userHobbies: $userHobbies
            userFaculty: $userFaculty
            userYearOfStudy: $userYearOfStudy
        )
    }
`;