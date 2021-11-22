import { authExchange } from '@urql/exchange-auth';
import { getAuth, addAuthToOperation, willAuthError, didAuthError } from './auth';

export const exchanges = authExchange({
  getAuth, addAuthToOperation, willAuthError, didAuthError,
});
