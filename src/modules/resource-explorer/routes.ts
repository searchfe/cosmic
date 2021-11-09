/**
 * @author biyingshuai<biyingshuai@gmail.com>
 * @description top routes
 */

import TeamDetail from './team/component/detail.svelte';
import ProjectDetail from './project/component/detail.svelte';
import AtomDetail from './design/component/atom/detail.svelte';

export enum ROUTES {
  INDEX,
  TEAM_DETAIL,
  PROJECT_DETAIL,
  DESIGN_ATOM,
}

interface RoutesValue {
  path: string;
  paramNames: string[];
}

const ROUTES_CONFIG: { [key in ROUTES]: RoutesValue } = {
  [ROUTES.INDEX]: {
    path: '/',
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
};

function getCompleteRoute(route: ROUTES): string {
  const { path, paramNames } = ROUTES_CONFIG[route];
  const paramPath = paramNames.map((param: string) => `:${param}`).join('/');
  return `${path}/${paramPath}`;
}

// TODO: validate params, recognize params
export function urlFor(route: ROUTES, params?: Record<string, unknown>): string {
  const { path, paramNames } = ROUTES_CONFIG[route];
  if (paramNames.length === 0 || !params) {
    return path;
  }
  const result = paramNames.map((paramName: string) => params[paramName] || paramName);
  return `${path}/${result.join('/')}`;
}

export const routes = {
  [getCompleteRoute(ROUTES.INDEX)]: TeamDetail,
  [getCompleteRoute(ROUTES.TEAM_DETAIL)]: TeamDetail,
  [getCompleteRoute(ROUTES.PROJECT_DETAIL)]: ProjectDetail,
  [getCompleteRoute(ROUTES.DESIGN_ATOM)]: AtomDetail,
};
