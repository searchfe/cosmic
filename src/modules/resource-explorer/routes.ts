/**
 * @author zfy<biyingshuai@gmail.com>
 * @description top routes
 */

export enum ROUTES {
  INDEX,
  TEAM_DETAIL,
  PROJECT_DETAIL,
  DESIGN_ATOM,
  LOGIN,
  DEFAULT
}

interface RoutesValue {
  path: string;
  paramNames: string[];
}

const ROUTES_CONFIG: { [key in ROUTES]: RoutesValue } = {
  [ROUTES.DEFAULT]: {
    path: '*',
    paramNames: [],
  },
  [ROUTES.INDEX]: {
    path: '',
    paramNames: [],
  },
  [ROUTES.TEAM_DETAIL]: {
    path: '/team',
    paramNames: ['teamId'],
  },
  [ROUTES.PROJECT_DETAIL]: {
    path: '/project',
    paramNames: ['projectId'],
  },
  [ROUTES.DESIGN_ATOM]: {
    path: '/design/atom',
    paramNames: ['teamId'],
  },
  [ROUTES.LOGIN]: {
    path: '/login',
    paramNames: [],
  },
};

export function routeFor(route: ROUTES): string {
  const { path, paramNames } = ROUTES_CONFIG[route];
  const paramPath = paramNames.map((param: string) => `:${param}`).join('/');
  return `${path}/${paramPath}`;
}

// TODO: validate params, recognize params
export function urlFor(route: ROUTES, params?: Record<string, unknown>): string {
  if (route === ROUTES.INDEX) {
    return '/';
  }
  const { path, paramNames } = ROUTES_CONFIG[route];
  if (paramNames.length === 0 || !params) {
    return path;
  }
  const result = paramNames.map((paramName: string) => params[paramName] || paramName);
  return `${path}/${result.join('/')}`;
}


