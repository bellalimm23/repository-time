import { FileWithPath } from '@mantine/dropzone';
import { Input } from 'components/elements/fields';
import { FileInput } from 'components/files-input';
import { students } from 'modules/admin/students/components/student-form-type';
import { useFormContext } from 'react-hook-form';

import { ThesisFormType, ThesisStatusEnum } from './thesis-form-type';

interface ThesisFormInformationProps {
  files: FileWithPath[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
}

export default function ThesisFormInformation(
  props: ThesisFormInformationProps,
) {
  const { files, setFiles } = props;
  const { getValues } = useFormContext<ThesisFormType>();
  const thesis = getValues('data');
  return (
    <>
      <Input
        type="select"
        name="nomor_identitas_mahasiswa"
        label="Mahasiswa"
        placeholder="Masukkan Mahasiswa"
        data={students.map((student) => {
          return {
            value: student.nomor_identitas,
            label: [
              student.nomor_identitas,
              [student.nama_depan, student.nama_tengah, student.nama_belakang]
                .filter(Boolean)
                .join(' '),
            ].join(' - '),
          };
        })}
      />
      <Input
        type="text"
        name="judul_tugas_akhir"
        label="Kode Judul Tugas Akhir"
        placeholder="Masukkan Kode Judul Tugas Akhir"
      />
      <Input
        type="textarea"
        name="abstrak"
        label="Nama Abstrak"
        placeholder="Masukkan Nama Abstrak"
      />
      <Input
        type="select"
        name="status"
        label="Status"
        placeholder="Masukkan Status"
        data={[
          { value: ThesisStatusEnum.pending, label: 'Pending' },
          { value: ThesisStatusEnum.approve, label: 'Approve' },
          { value: ThesisStatusEnum.reject, label: 'Reject' },
        ]}
      />
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
        defaultUrls={thesis?.items?.map((item) => item.file_url)}
      />
    </>
  );
}
