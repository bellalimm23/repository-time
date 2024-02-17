import { FileType } from 'common/constants/file';

import supabase from './supabase';

const BUCKET_NAME = 'repository';

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
  const result = await supabase.storage.from(BUCKET_NAME).remove(path);
  return result;
}

export function generateFilePath(thesisId: string, fileType: FileType) {
  return `${thesisId}/${fileType}.pdf` as const;
}
