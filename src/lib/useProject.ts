import { gql, useQuery } from '@apollo/client';
import {
  getProjects,
  getProjectsVariables,
} from '../__generated__/getProjects';

export const GET_PROJECTS_QUERY = gql`
  query getProjects($input: GetProjectsInput!) {
    getProjects(input: $input) {
      ok
      error
      projects {
        id
        createAt
        updateAt
        code
        name
        owner {
          name
          role
          email
        }
        githubURL
        sprints {
          id
          createAt
          updateAt
          startDate
          endDate
          period
          purpose
        }
        members {
          id
          user {
            id
            profileUrl
            name
          }
          role
        }
      }
    }
  }
`;

export const useProject = (id: number) => {
  return useQuery<getProjects, getProjectsVariables>(GET_PROJECTS_QUERY, {
    variables: {
      input: {
        id: id,
      },
    },
    // pollInterval: 500,
  });
};
