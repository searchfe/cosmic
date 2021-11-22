/**
 * @author zfy<biyingshuai@gmail.com>
 * @description auth token
 */
import { makeOperation } from '@urql/svelte';
import type { Operation, CombinedError, OperationType, OperationContext } from '@urql/svelte';
import { logout } from '../user';

interface IAuthState {
  accessToken?: string;
}

interface AddParams {
  authState: IAuthState | null;
  operation: Operation;
}

interface GetParams {
  authState: IAuthState | null;
  operation?: Operation | null;
}

export function addAuthToOperation(params: AddParams) {
  const { authState, operation } = params || {};
  const fetchOptions = operation?.context?.fetchOptions;
  if (!authState || !authState.accessToken) {
    return operation;
  }
  if (!operation) {

    throw Error('runtime error');
  }
  const { kind, context } = operation;
  if (!kind || !context) {

    throw Error('runtime error');
  }

  const options = typeof fetchOptions === 'function' ? fetchOptions() : fetchOptions || {};

  return makeOperation(kind as OperationType, operation, {
    ...context,
    fetchOptions: {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${authState.accessToken}`,
      },
    },
  } as OperationContext);
}

export async function getAuth(params: GetParams) {
  const { authState } = params;
  if (!authState) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      return { accessToken };
    }
    // logout();
    // return null;
  }
  logout();
  return null;
}

export const didAuthError = ({ error }: { error: CombinedError }) => {
  return error.graphQLErrors.some(e => e.extensions?.code === 'UNAUTHENTICATED');
};

export function willAuthError({ authState }: GetParams) {
  if (!authState || !authState.accessToken) {
    return true;
  }
  // TODO: check expires
  return false;
}
