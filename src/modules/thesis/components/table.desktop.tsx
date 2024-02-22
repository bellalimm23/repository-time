import classNames from 'classnames';
import { DynamicRoutes } from 'common/routes/routes';
import colors from 'common/styles/colors';
import { generateIEEEReference } from 'common/utils/string';
import Text from 'components/elements/text';
import { format } from 'date-fns';
import {
  ThesisModel,
  thesis,
} from 'modules/admin/admin-thesis/components/form-type';
import { useRouter } from 'next/router';
import structuralStyles from 'styles/layout.css';

interface ThesisTableListProps {
  thesis: ThesisModel[];
}

export default function ThesisTableList(props: ThesisTableListProps) {
  const { push } = useRouter();
  return (
    <div
      className={structuralStyles.fill({
        width: true,
      })}
    >
      <div
        className={classNames(
          structuralStyles.fill({
            width: true,
          }),
          structuralStyles.flexbox({
            direction: 'column',
            gap: 'md',
            align: 'start',
          }),
        )}
      >
        {thesis.map((item, index) => {
          return (
            <div
              key={item.id}
              style={{
                borderBottom: `1px solid ${colors.borderOverlay}`,
                width: '100%',
                paddingBottom: 6,
              }}
              onClick={() => push(DynamicRoutes.thesisShow(item.id))}
            >
              <Text>
                {index + 1}.&nbsp;&nbsp;
                <Text
                  span
                  c="blue"
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  {generateIEEEReference({
                    users: item.users.map((user) => {
                      return {
                        firstName: user.nama_depan,
                        lastName: user.nama_belakang,
                        middleName: user.nama_tengah,
                      };
                    }),
                    publishYear: format(item.waktu_disetujui, 'yyyy'),
                    title: item.judul,
                    publisher: 'STMIK TIME',
                  })}
                </Text>
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
}
