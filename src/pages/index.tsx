import UserLayout from 'components/common/user-layout';
import Home from 'modules/home/home';

export default function HomePage() {
  return <Home />;
}

HomePage.getLayout = function (page) {
  return <UserLayout isShowBackground>{page}</UserLayout>;
};
