import UserLayout from 'components/common/user-layout';

export default function HomePage() {
  return <></>;
}

HomePage.getLayout = function (page) {
  return <UserLayout isShowBackground>{page}</UserLayout>;
};
