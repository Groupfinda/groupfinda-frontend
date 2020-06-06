import gql from "graphql-tag";

export const REFETCH_QUERY = gql`
  mutation {
    refetchQuery
  }
`;

export const GET_PRESIGNED_URL = gql`
  mutation getPresignedURL($key: String!) {
    getPresignedURL(key: $key)
  }
`;

export type GetPresignedUrlData = {
  getPresignedURL: {
    url: string;
    fields: {
      [key: string]: string;
    };
  };
};

export type GetPresignedUrlVariables = {
  key: string;
};
