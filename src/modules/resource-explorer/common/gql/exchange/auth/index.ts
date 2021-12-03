import { authExchange } from '@urql/exchange-auth';
import { getAuth, addAuthToOperation, willAuthError, didAuthError } from './auth';

export const exchange = authExchange({
  getAuth, addAuthToOperation, willAuthError, didAuthError,
});
