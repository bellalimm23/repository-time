import classNames from 'classnames';
import { DynamicRoutes } from 'common/routes/routes';
import colors from 'common/styles/colors';
import Text from 'components/elements/text';
import { DocumentModel } from 'modules/profile/form-type';
import { useRouter } from 'next/router';
import structuralStyles from 'styles/layout.css';

interface DocumentListProps {
  documents: DocumentModel[];
}

export default function DocumentList(props: DocumentListProps) {
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
        {props.documents.map((item, index) => {
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
                  {item.nama}
                </Text>
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
}
