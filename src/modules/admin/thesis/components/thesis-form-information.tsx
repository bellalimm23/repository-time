import { FileWithPath } from '@mantine/dropzone';
import { Input } from 'components/elements/fields';
import { FileInput } from 'components/files-input';
import StudentSelect from 'modules/components/selects/student-select';
import { useFormContext } from 'react-hook-form';

import { ThesisFormType, ThesisStatusEnum } from './thesis-form-type';

interface ThesisFormInformationProps {
  files: FileWithPath[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
  isUser?: boolean;
}

export default function ThesisFormInformation(
  props: ThesisFormInformationProps,
) {
  const { files, setFiles, isUser } = props;
  const { getValues } = useFormContext<ThesisFormType>();
  const thesis = getValues('data');
  return (
    <>
      <StudentSelect
        name="nomor_identitas_mahasiswa"
        label="Mahasiswa"
        placeholder="Masukkan Mahasiswa"
        disabled={isUser}
      />
      <Input
        type="text"
        name="judul_tugas_akhir"
        label="Judul Tugas Akhir"
        placeholder="Masukkan Judul Tugas Akhir"
      />
      <Input
        type="textarea"
        name="abstrak"
        label="Nama Abstrak"
        placeholder="Masukkan Nama Abstrak"
      />
      {!isUser && (
        <Input
          type="select"
          name="status"
          label="Status"
          placeholder="Masukkan Status"
          data={[
            { value: ThesisStatusEnum.pending, label: 'Pending' },
            { value: ThesisStatusEnum.approve, label: 'Terima' },
            { value: ThesisStatusEnum.reject, label: 'Tolak' },
          ]}
        />
      )}
      <Input
        type="date"
        name="waktu_terbit"
        label="Waktu Terbit"
        placeholder="Masukkan Waktu Terbit"
      />
      <FileInput
        files={files}
        onDrop={setFiles}
        label="Files"
        defaultUrls={thesis?.lampiranTugasAkhir?.map((item) => item.fileUrl)}
      />
    </>
  );
}
