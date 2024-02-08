import { StaticRoutesType } from 'common/routes/routes';
import { useRouter } from 'next/router';

export default function useStaticNavigation() {
  const { push, replace } = useRouter();
  const windowInitiated = typeof window !== 'undefined';
  return {
    push: (route: StaticRoutesType) => () => windowInitiated && push(route),
    replace: (route: StaticRoutesType) => () =>
      windowInitiated && replace(route),
  };
}
