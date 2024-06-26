import { AdminLiteModel, AdminModel } from 'api-hooks/admin/model';
import { MeModel } from 'api-hooks/auth/model';
import {
  CertificationLiteModel,
  CertificationModel,
} from 'api-hooks/certification/model';
import { EducationLiteModel, EducationModel } from 'api-hooks/education/model';
import {
  ExperienceLiteModel,
  ExperienceModel,
} from 'api-hooks/experience/model';
import {
  OrganizationLiteModel,
  OrganizationModel,
} from 'api-hooks/organization/model';
import { StudentLiteModel, StudentModel } from 'api-hooks/student/model';
import {
  StudyProgramLiteModel,
  StudyProgramModel,
} from 'api-hooks/study-program/model';
import { ThesisLiteModel, ThesisModel } from 'api-hooks/thesis/model';
import { Expose, Type } from 'class-transformer';

export class CommonModel {
  id: string;

  @Expose({ name: 'tanggal_dibuat' })
  @Type(() => Date)
  tanggalDibuat: Date;

  @Expose({ name: 'tanggal_diubah' })
  @Type(() => Date)
  tanggalDiubah: Date;
}

export class AttachmentModel {
  id: string;

  @Expose({ name: 'file_url' })
  fileUrl: string;

  @Expose({ name: 'jenis_file' })
  jenisFile: string;
}

export class ApiResult<T> {
  data: T;
  message: string;
}

export class ApiError {
  message: string;
  errors?: object[];
}
export type DeleteType = {
  id: string;
};

export type ProfileModel = StudentLiteModel | MeModel | StudentModel;

export type AdminType = {
  dataType: '/admins';
  data: AdminLiteModel | AdminModel;
};

export type StudentType = {
  dataType: '/students';
  data: StudentLiteModel | StudentModel;
};

export type CertificationType = {
  dataType: '/certifications';
  data: CertificationLiteModel | CertificationModel;
};

export type EducationType = {
  dataType: '/educations';
  data: EducationLiteModel | EducationModel;
};

export type ExperienceType = {
  dataType: '/experiences';
  data: ExperienceLiteModel | ExperienceModel;
};

export type OrganizationType = {
  dataType: '/organizations';
  data: OrganizationLiteModel | OrganizationModel;
};
export type ThesisType = {
  dataType: '/thesis';
  data: ThesisLiteModel | ThesisModel;
};

export type StudyProgramType = {
  dataType: '/study-programs';
  data: StudyProgramLiteModel | StudyProgramModel;
};

export type DeleteableType =
  | AdminType
  | StudentType
  | CertificationType
  | EducationType
  | ExperienceType
  | OrganizationType
  | ThesisType
  | StudyProgramType;
