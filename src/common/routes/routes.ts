export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
} as const;

export type StaticRoutesType = (typeof routes)[keyof typeof routes];
