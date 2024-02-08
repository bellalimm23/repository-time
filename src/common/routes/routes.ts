export const StaticRoutes = {
  //private
  profile: '/profile' as const,
  //public
  login: '/login' as const,
  register: '/register' as const,
  forgotPassword: '/forgot-password' as const,

  home: '/' as const,
  users: '/users' as const,
  thesis: '/thesis' as const,

  //admin
  adminHome: '/admin/' as const,
  adminUser: '/admin/users' as const,
  adminThesis: '/admin/thesis' as const,
} as const;

export const DynamicRoutes = {
  //public
  userShow: (id: string) => `${StaticRoutes.users}/${id}` as const,
  thesisShow: (id: string) => `${StaticRoutes.thesis}/${id}` as const,
  adminUserShow: (id: string) => `${StaticRoutes.adminUser}/${id}` as const,
  adminThesis: (id: string) => `${StaticRoutes.adminThesis}/${id}` as const,
} as const;

export type StaticRoutesType = (typeof StaticRoutes)[keyof typeof StaticRoutes];
