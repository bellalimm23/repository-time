import { FileType } from 'common/constants/file';

import supabase from './supabase';

const BUCKET_NAME = 'repository';

const ENDPOINT =
  'https://srxjxwfnbpkiieeyxpux.supabase.co/storage/v1/object/public/repository/' as const;

export async function uploadFile(path: string, file: File) {
  const result = await supabase.storage.from(BUCKET_NAME).upload(path, file, {
    upsert: true, //overwrite when if file exist
  });

  return result;
}

export async function downloadFile(path: string) {
  const result = await supabase.storage.from(BUCKET_NAME).download(path);
  return result;
}

export async function deleteFiles(path: string[]) {
  const result = await supabase.storage
    .from(BUCKET_NAME)
    .remove(path.map((file) => file.replace(ENDPOINT, '')));
  return result;
}

export function generateFilePath(thesisId: string, fileType: FileType) {
  return `${thesisId}/${fileType}.pdf` as const;
}

export async function uploadAttachmentFiles(
  attachmentType:
    | 'lampiran_sertifikasi'
    | 'lampiran_pendidikan'
    | 'lampiran_pengalaman'
    | 'lampiran_organisasi'
    | 'lampiran_thesis',
  nomorIdentitas: string,
  files: File[],
  oldData: string[] = [],
) {
  const results = await Promise.all(
    files.map(async (file, index) => {
      const result = await uploadFile(
        `${attachmentType}/${nomorIdentitas}/${attachmentType}_${index.toString().padStart(4, '0')}.pdf`,
        file,
      );

      return result;
    }),
  );

  const necessaryFiles = results
    .map(({ data }) => {
      return data?.path;
    })
    .filter(Boolean)
    .map((file) => ENDPOINT + file);

  const unusedFiles = oldData.filter((file) => {
    const isNecessary = necessaryFiles.includes(file);
    return !isNecessary;
  });

  const onDeleteFiles = () => deleteFiles(unusedFiles);

  return { results: necessaryFiles, onDeleteFiles };
}

export async function uploadPhotoProfile(nomorIdentitas: string, file: File) {
  const result = await uploadFile(`/photo-profile/${nomorIdentitas}.png`, file);
  return ENDPOINT + result;
}
