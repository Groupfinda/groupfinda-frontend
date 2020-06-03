import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $gender: String!
    $birthday: Date!
  ) {
    createUser(
      username: $username
      password: $password
      confirmPassword: $confirmPassword
      firstName: $firstName
      lastName: $lastName
      email: $email
      gender: $gender
      birthday: $birthday
    ) {
      token
    }
  }
`;

export const FORGET_PASSWORD = gql`
  mutation forgetPassword($username: String!, $email: String!) {
    forgetPassword(username: $username, email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword(
    $originalPassword: String!
    $newPassword: String!
    $confirmNewPassword: String!
  ) {
    resetPassword(
      originalPassword: $originalPassword
      newPassword: $newPassword
      confirmNewPassword: $confirmNewPassword
    )
  }
`;

export const REFETCH_QUERY = gql`
  mutation {
    refetchQuery
  }
`;

export const UPDATE_USER = gql`
  mutation updateUserField(
    $firstName: String
    $lastName: String
    $birthday: Date
    $gender: String
    $avatar: String
    $lowerAge: Int
    $upperAge: Int
    $maxDistance: Int
  ) {
    updateUserField(
      firstName: $firstName
      lastName: $lastName
      birthday: $birthday
      gender: $gender
      avatar: $avatar
      lowerAge: $lowerAge
      upperAge: $upperAge
      maxDistance: $maxDistance
    )
  }
`;
