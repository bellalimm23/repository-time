import classNames from 'classnames';
import { DynamicRoutes } from 'common/routes/routes';
import colors from 'common/styles/colors';
import Text from 'components/elements/text';
import { generateSubjectName } from 'modules/admin/admin-subject/components/form-type';
import {
  UserModel,
  generateName,
} from 'modules/admin/admin-user/components/form-type';
import { useRouter } from 'next/router';
import structuralStyles from 'styles/layout.css';

interface UserTableListProps {
  users: UserModel[];
}

export default function UserTableList(props: UserTableListProps) {
  const { users } = props;
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
        {users.map((item, index) => {
          const name = generateName(item);
          const subject = generateSubjectName(item.jurusan);

          return (
            <div
              key={item.id}
              style={{
                borderBottom: `1px solid ${colors.borderOverlay}`,
                width: '100%',
                paddingBottom: 6,
              }}
              onClick={() => push(DynamicRoutes.userShow(item.id))}
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
                  {item.nomor_identitas} - {name} ({subject})
                </Text>
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
}
