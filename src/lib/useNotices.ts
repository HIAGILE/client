import { gql, useQuery } from '@apollo/client';
import { getNotices } from '__generated__/getNotices';

export const GET_NOTICES_QUERY = gql`
  query getNotices {
    getNotices {
      ok
      error
      notices {
        createAt
        updateAt
        description
        id
      }
    }
  }
`;

export const useNotices = (id: number) => {
  return useQuery<getNotices>(GET_NOTICES_QUERY);
};
