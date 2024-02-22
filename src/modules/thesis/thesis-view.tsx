import { useMediaQuery } from '@mantine/hooks';
import breakpoints from 'common/styles/breakpoint';
import { capitalize, generateIEEEReference } from 'common/utils/string';
import Separator from 'components/common/separator';
import Text from 'components/elements/text';
import { format } from 'date-fns';
import FileDescriptor from 'modules/admin/admin-thesis/components/file-descriptor';
import { thesis } from 'modules/admin/admin-thesis/components/form-type';
import Container from 'modules/components/container';
import { useRouter } from 'next/router';
import structuralStyles from 'styles/layout.css';

export default function ThesisView() {
  const { query } = useRouter();
  const { id } = query;
  const item = thesis.find((thesis) => thesis.id === id);
  const isMobile = useMediaQuery(breakpoints.screenMaxMd);
  const textVariantLabel = isMobile ? 'body1Semibold' : 'h3';

  return (
    <Container
      style={{
        padding: 24,
      }}
    >
      <Text textVariant="h1">{item.judul}</Text>
      <Text>
        {generateIEEEReference({
          publishYear: format(item.waktu_disetujui, 'yyyy'),
          title: item.judul,
          users: item.users.map((user) => {
            return {
              firstName: user.nama_depan,
              lastName: user.nama_belakang,
              middleName: user.nama_tengah,
            };
          }),
          publisher: 'STMIK TIME',
        })}
      </Text>
      <Separator gap={16} />
      <div
        className={structuralStyles.flexbox({
          direction: 'column',
          gap: 'md',
          align: 'start',
        })}
      >
        <FileDescriptor fileType="bagian_awal" permission="user" />
        <FileDescriptor fileType="bab_1" permission="user" />
        <FileDescriptor fileType="bab_2" permission="user" />
        <FileDescriptor fileType="bab_3" permission="user" />
        <FileDescriptor fileType="bab_4" permission="user" />
        <FileDescriptor fileType="bab_5" permission="user" />
        <FileDescriptor fileType="bagian_akhir" permission="user" />
      </div>
      <Separator gap={16} />
      <div
        className={structuralStyles.flexbox({
          direction: 'column',
          gap: 'md',
          align: 'start',
        })}
      >
        <Text textVariant={textVariantLabel}>Abstrak:</Text>
        <Text>{item.abstrak}</Text>
        <Text textVariant={textVariantLabel}>Jenis Tesis:</Text>
        <Text>{capitalize(item.tipe)}</Text>
        <Text textVariant={textVariantLabel}>Fakultas:</Text>
        <Text>{item.fakultas.nama}</Text>
        <Text textVariant={textVariantLabel}>Jurusan:</Text>
        <Text>
          {item.jurusan.kode} - {item.jurusan.nama}
        </Text>
        <Text textVariant={textVariantLabel}>Waktu Diterbitkan:</Text>
        <Text>{format(item.waktu_disetujui, 'dd MMM yyyy, HH:mm')}</Text>
      </div>
    </Container>
  );
}
