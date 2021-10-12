export enum ROUTES_ENUM {
  INDEX,
  TEAM_DETAIL,
  PROJECT_DETAIL,
  DESIGN_ATOM,
}

interface RoutesValue {
  path: string;
  paramNames: string[];
}

export const ROUTES: {[key in ROUTES_ENUM]: RoutesValue} = {
  [ROUTES_ENUM.INDEX]: {
    path: '/',
    paramNames: [],
  },
  [ROUTES_ENUM.TEAM_DETAIL]: {
    path: '/team',
    paramNames: ['teamId'],
  },
  [ROUTES_ENUM.PROJECT_DETAIL]: {
    path: '/project',
    paramNames: ['projectId'],
  },
  [ROUTES_ENUM.DESIGN_ATOM]: {
    path: '/design/atom',
    paramNames: ['teamId'],
  },
};

export function getCompleteRoute(route: ROUTES_ENUM): string {
  const { path, paramNames } = ROUTES[route];
  const paramPath = paramNames.map((param: string) => `:${param}`).join('/');
  return `${path}/${paramPath}`;
}

// TODO: validate params, recognize params
export function urlFor(route: ROUTES_ENUM, params?: Record<string, unknown>): string {
  const { path, paramNames } = ROUTES[route];
  if (paramNames.length === 0 || !params) {
    return path;
  }
  const result = paramNames.map((paramName: string) => params[paramName] || paramName);
  return `${path}/${result.join('/')}`;
}
