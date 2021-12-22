import type { Color, CreateColorDTO, QueryColorDTO } from '../../common/types/graphql';
import { operationStore, mutation } from '@urql/svelte';

export const queryColors = (color: QueryColorDTO) => {
  return operationStore<{ colors: Color[] }, { color: QueryColorDTO }>(
    `
    subscription ($color: QueryColorDTO) {
      colors(color: $color) {
        id,
        color,
        team,
        variant {
          light,
          dark
        }
      }
    }
  `,
    { color },
    { requestPolicy: 'cache-first' },
  );
};

export const createColor = () => {
  return mutation<{ createColor: { id: string } }, { color: CreateColorDTO }>({
    query: `
      mutation ($color: CreateColorDTO!) {
        createColor(color: $color) {
          id,
        }
      }
    `,
  });
};
