import { FileWithPath } from '@mantine/dropzone';
import Separator from 'components/common/separator';
import { Input } from 'components/elements/fields';
import PhotoProfileInput from 'components/photo-profile-input';
import { useFormContext } from 'react-hook-form';

import { StudentFormType } from './student-form-type';

interface StudentInformationFormProps {
  files: FileWithPath[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
}

export default function StudentInformationForm(
  props: StudentInformationFormProps,
) {
  const { files, setFiles } = props;
  const { getValues } = useFormContext<StudentFormType>();
  const student = getValues('data');
  return (
    <>
      <PhotoProfileInput
        label="Foto Profil"
        defaultImage={student?.photo_url}
        files={files}
        onDrop={setFiles}
      />
      <Separator gap={16} />
      <Input
        type="text"
        name="nama_depan"
        label="Nama Depan"
        placeholder="Masukkan Nama Depan"
      />
      <Input
        type="text"
        name="nama_tengah"
        label="Nama Tengah"
        placeholder="Masukkan Nama Tengah"
      />
      <Input
        type="text"
        name="nama_belakang"
        label="Nama Belakang"
        placeholder="Masukkan Nama Belakang"
      />
      {!student && (
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Masukkan Password"
        />
      )}
      <Input
        type="textarea"
        name="deskripsi"
        label="Deskripsi"
        placeholder="Masukkan Deskripsi"
      />
    </>
  );
}
