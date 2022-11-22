import { gql, useQuery } from '@apollo/client';
import { meVar } from 'apollo';
import { meQuery } from '../__generated__/meQuery';

export const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
      name
      profileUrl
    }
  }
`;

export const useMe = () => {
  return useQuery<meQuery>(ME_QUERY);
};
