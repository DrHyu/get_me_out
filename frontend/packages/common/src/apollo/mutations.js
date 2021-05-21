import { gql } from "@apollo/client";

export const tokenAuthMutation = gql`
  mutation ($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      success
      token
      refreshToken
      user {
        id
      }
      unarchiving
    }
  }
`;

export default [tokenAuthMutation];
