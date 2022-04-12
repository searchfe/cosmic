import { authExchange as exchange } from '@urql/exchange-auth';
import { getAuth, addAuthToOperation, willAuthError, didAuthError } from './auth';

// TODO: 所有模块取拿token通过user.ts
export const authExchange = exchange({
    getAuth,
    addAuthToOperation,
    willAuthError,
    didAuthError,
});
