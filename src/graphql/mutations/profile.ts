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

export const UPDATE_NEW_USER = gql`
    mutation updateNewUser(
        $newUser: Boolean
        $lowerAge: Int
        $upperAge: Int
        $userHobbies: [String]
        $userFaculty: String
        $userYearOfStudy: Int
    ) {
        updateUserField(
            newUser: $newUser
            lowerAge: $lowerAge
            upperAge: $upperAge
        ),
        updateProfileField(
            userHobbies: $userHobbies
            userFaculty: $userFaculty
            userYearOfStudy: $userYearOfStudy
        )
    }
`;