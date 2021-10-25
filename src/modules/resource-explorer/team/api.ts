import type { Team } from '../common/types/graphql';
import { operationStore } from '@urql/svelte';

export const teamsQuery = operationStore<any, any, { teams: Team[] }>(`
  query getAllTeams {
    teams {
      name,
      id
    }
  }
`);
