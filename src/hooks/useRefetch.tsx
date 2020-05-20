import { REFETCH_QUERY } from "../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";
import { PureQueryOptions } from "apollo-boost";

export const useRefetch = (queries: (string | PureQueryOptions)[]) => {
  const [refetchQuery] = useMutation<{ refetchQuery: string }, void>(
    REFETCH_QUERY,
    {
      refetchQueries: queries,
    }
  );

  return refetchQuery;
};
