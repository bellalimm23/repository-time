import { NavigationRoute } from 'common/routes/routes';
import Text, { TextProps } from 'components/elements/text';
import { useRouter } from 'next/router';
import React from 'react';

interface FormLabelProps extends TextProps {}

export default function FormLabel(props: FormLabelProps) {
  const { pathname } = useRouter();
  const label = React.useMemo(() => {
    switch (pathname as NavigationRoute) {
      case NavigationRoute.AdminEmployeeList:
        return 'Daftar Admin';
      case NavigationRoute.AdminEmployeeView:
        return 'Detail Admin';
      case NavigationRoute.AdminEmployeeCreate:
        return 'Buat Admin';
      case NavigationRoute.AdminStudentList:
        return 'Daftar Mahasiswa';
      case NavigationRoute.AdminStudentView:
        return 'Detail Mahasiswa';
      case NavigationRoute.AdminStudentCreate:
        return 'Buat Mahasiswa';
      case NavigationRoute.AdminStudyProgramList:
        return 'Daftar Program Studi';
      case NavigationRoute.AdminStudyProgramView:
        return 'Detail Program Studi';
      case NavigationRoute.AdminStudyProgramCreate:
        return 'Buat Program Studi';
      case NavigationRoute.AdminThesisList:
        return 'Daftar Karya Ilmiah';
      case NavigationRoute.AdminThesisView:
        return 'Detail Karya Ilmiah';
      case NavigationRoute.AdminThesisCreate:
        return 'Buat Karya Ilmiah';
      //
      case NavigationRoute.StudentList:
        return 'Daftar Mahasiswa';
      case NavigationRoute.ThesisList:
        return 'Daftar Karya Ilmiah';

      case NavigationRoute.Profile:
      case NavigationRoute.Login:
      case NavigationRoute.Register:
      case NavigationRoute.Home:
      case NavigationRoute.StudentView:
      case NavigationRoute.ThesisView:
      case NavigationRoute.AdminHome:
      case NavigationRoute.AdminLogin:
      default:
        return '';
    }
  }, [pathname]);

  return (
    <Text {...props} textVariant="h1" mb={8}>
      {label}
    </Text>
  );
}
