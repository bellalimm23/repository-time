export enum NavigationRoute {
  Profile = '/profile',
  Login = '/login',
  Register = '/register',

  //user

  Home = '/',
  StudentList = '/students',
  StudentView = '/students/[id]',
  ThesisList = '/thesis',
  ThesisView = '/thesis/[id]',

  //admin
  AdminHome = '/admin',
  AdminLogin = '/admin/login',

  AdminEmployeeList = '/admin/employee',
  AdminEmployeeView = '/admin/employee/[id]',
  AdminEmployeeCreate = '/admin/employee/create',

  AdminStudentList = '/admin/student',
  AdminStudentView = '/admin/student/[id]',
  AdminStudentCreate = '/admin/student/create',

  AdminStudyProgramList = '/admin/study-program',
  AdminStudyProgramView = '/admin/study-program/[id]',
  AdminStudyProgramCreate = '/admin/study-program/create',

  AdminThesisList = '/admin/thesis',
  AdminThesisView = '/admin/thesis/[id]',
  AdminThesisCreate = '/admin/thesis/create',
}
