import { CommonModel } from 'common/constants/api';
import {
  ThesisStatus,
  ThesisStatusType,
  ThesisType,
  ThesisTypeType,
} from 'common/constants/tesis';
import { userType } from 'common/constants/user';
import { DivisionModel } from 'modules/admin/admin-division/components/form-type';
import {
  SubjectModel,
  subjects,
} from 'modules/admin/admin-subject/components/form-type';
import {
  UserModel,
  users,
} from 'modules/admin/admin-user/components/form-type';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const AdminThesisSchema = () =>
  Yup.object({
    judul: Yup.string().required(),
    tipe: Yup.string().required().default(ThesisType.skripsi),
    status: Yup.string().required().default(ThesisStatus.pending),
    abstrak: Yup.string().required().default(''),
    jurusan_id: Yup.string().required().default(''),
    fakultas_id: Yup.string().required().default(''),
    waktu_disetujui: Yup.date().required().default(new Date()),
    user_ids: Yup.array(Yup.string()).default([]),
  });

export type AdminThesisFormType = Yup.InferType<
  ReturnType<typeof AdminThesisSchema>
>;

export type AdminThesisMethodType = ReturnType<
  typeof useForm<AdminThesisFormType>
>;

export type ThesisModel = {
  status: ThesisStatusType;
  tipe: ThesisTypeType;
  judul: string;
  abstrak: string;
  jurusan: SubjectModel;
  fakultas: DivisionModel;
  users: UserModel[];
  waktu_disetujui: Date;
} & CommonModel;

export const thesis: ThesisModel[] = [
  {
    abstrak:
      'Veniam voluptate culpa elit elit qui est pariatur nulla commodo eu elit. Reprehenderit mollit excepteur deserunt eu ea dolore veniam deserunt sit nulla officia eu. Aute laboris labore cupidatat esse ea minim est do sunt incididunt laborum anim dolor. Pariatur deserunt minim aliqua velit occaecat occaecat. Id Lorem ullamco aliqua mollit cupidatat laborum excepteur non dolor nulla do. Amet labore consequat ad fugiat labore tempor nostrud ut fugiat do incididunt pariatur est fugiat. Anim deserunt ut excepteur elit.Officia ut enim est culpa irure amet. Consectetur enim consequat ad eu reprehenderit dolor. Velit eu ad laborum sint irure velit. Cupidatat excepteur culpa esse consequat laboris labore est eiusmod ullamco ex sint dolor veniam officia. Ullamco aliqua veniam voluptate laboris quis culpa et velit occaecat laboris aliqua. Pariatur aliquip veniam veniam ipsum anim laborum ipsum ea eu id consectetur nisi. Ea ut aute non minim velit laboris id anim. Consequat et anim veniam cupidatat minim magna fugiat. Voluptate commodo pariatur laborum exercitation commodo veniam. Pariatur nisi adipisicing minim ipsum Lorem nulla sit.',
    jurusan: subjects[0],
    fakultas: subjects[0].fakultas,
    id: '1',
    judul: 'Labore proident sint ullamco ullamco laborum incididunt.',
    tipe: ThesisType.skripsi,
    status: ThesisStatus.pending,
    users: users.filter((user) => user.tipe_user === userType.user),
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
    waktu_disetujui: new Date(),
  },
  {
    abstrak:
      'Veniam voluptate culpa elit elit qui est pariatur nulla commodo eu elit. Reprehenderit mollit excepteur deserunt eu ea dolore veniam deserunt sit nulla officia eu. Aute laboris labore cupidatat esse ea minim est do sunt incididunt laborum anim dolor. Pariatur deserunt minim aliqua velit occaecat occaecat. Id Lorem ullamco aliqua mollit cupidatat laborum excepteur non dolor nulla do. Amet labore consequat ad fugiat labore tempor nostrud ut fugiat do incididunt pariatur est fugiat. Anim deserunt ut excepteur elit.Officia ut enim est culpa irure amet. Consectetur enim consequat ad eu reprehenderit dolor. Velit eu ad laborum sint irure velit. Cupidatat excepteur culpa esse consequat laboris labore est eiusmod ullamco ex sint dolor veniam officia. Ullamco aliqua veniam voluptate laboris quis culpa et velit occaecat laboris aliqua. Pariatur aliquip veniam veniam ipsum anim laborum ipsum ea eu id consectetur nisi. Ea ut aute non minim velit laboris id anim. Consequat et anim veniam cupidatat minim magna fugiat. Voluptate commodo pariatur laborum exercitation commodo veniam. Pariatur nisi adipisicing minim ipsum Lorem nulla sit.',
    jurusan: subjects[0],
    fakultas: subjects[0].fakultas,
    id: '2',
    judul: 'Labore proident sint ullamco ullamco laborum incididunt.',
    tipe: ThesisType.skripsi,
    status: ThesisStatus.approved,
    users: users.filter((user) => user.tipe_user === userType.user),
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
    waktu_disetujui: new Date(),
  },
  {
    abstrak:
      'Veniam voluptate culpa elit elit qui est pariatur nulla commodo eu elit. Reprehenderit mollit excepteur deserunt eu ea dolore veniam deserunt sit nulla officia eu. Aute laboris labore cupidatat esse ea minim est do sunt incididunt laborum anim dolor. Pariatur deserunt minim aliqua velit occaecat occaecat. Id Lorem ullamco aliqua mollit cupidatat laborum excepteur non dolor nulla do. Amet labore consequat ad fugiat labore tempor nostrud ut fugiat do incididunt pariatur est fugiat. Anim deserunt ut excepteur elit.Officia ut enim est culpa irure amet. Consectetur enim consequat ad eu reprehenderit dolor. Velit eu ad laborum sint irure velit. Cupidatat excepteur culpa esse consequat laboris labore est eiusmod ullamco ex sint dolor veniam officia. Ullamco aliqua veniam voluptate laboris quis culpa et velit occaecat laboris aliqua. Pariatur aliquip veniam veniam ipsum anim laborum ipsum ea eu id consectetur nisi. Ea ut aute non minim velit laboris id anim. Consequat et anim veniam cupidatat minim magna fugiat. Voluptate commodo pariatur laborum exercitation commodo veniam. Pariatur nisi adipisicing minim ipsum Lorem nulla sit.',
    jurusan: subjects[0],
    fakultas: subjects[0].fakultas,
    id: '3',
    judul: 'Labore proident sint ullamco ullamco laborum incididunt.',
    tipe: ThesisType.skripsi,
    status: ThesisStatus.canceled,
    users: users.filter((user) => user.tipe_user === userType.user),
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
    waktu_disetujui: new Date(),
  },
  {
    abstrak:
      'Veniam voluptate culpa elit elit qui est pariatur nulla commodo eu elit. Reprehenderit mollit excepteur deserunt eu ea dolore veniam deserunt sit nulla officia eu. Aute laboris labore cupidatat esse ea minim est do sunt incididunt laborum anim dolor. Pariatur deserunt minim aliqua velit occaecat occaecat. Id Lorem ullamco aliqua mollit cupidatat laborum excepteur non dolor nulla do. Amet labore consequat ad fugiat labore tempor nostrud ut fugiat do incididunt pariatur est fugiat. Anim deserunt ut excepteur elit.Officia ut enim est culpa irure amet. Consectetur enim consequat ad eu reprehenderit dolor. Velit eu ad laborum sint irure velit. Cupidatat excepteur culpa esse consequat laboris labore est eiusmod ullamco ex sint dolor veniam officia. Ullamco aliqua veniam voluptate laboris quis culpa et velit occaecat laboris aliqua. Pariatur aliquip veniam veniam ipsum anim laborum ipsum ea eu id consectetur nisi. Ea ut aute non minim velit laboris id anim. Consequat et anim veniam cupidatat minim magna fugiat. Voluptate commodo pariatur laborum exercitation commodo veniam. Pariatur nisi adipisicing minim ipsum Lorem nulla sit.',
    jurusan: subjects[0],
    fakultas: subjects[0].fakultas,
    id: '4',
    judul: 'Labore proident sint ullamco ullamco laborum incididunt.',
    tipe: ThesisType.skripsi,
    status: ThesisStatus.finished,
    users: users.filter((user) => user.tipe_user === userType.user),
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
    waktu_disetujui: new Date(),
  },
  {
    abstrak:
      'Veniam voluptate culpa elit elit qui est pariatur nulla commodo eu elit. Reprehenderit mollit excepteur deserunt eu ea dolore veniam deserunt sit nulla officia eu. Aute laboris labore cupidatat esse ea minim est do sunt incididunt laborum anim dolor. Pariatur deserunt minim aliqua velit occaecat occaecat. Id Lorem ullamco aliqua mollit cupidatat laborum excepteur non dolor nulla do. Amet labore consequat ad fugiat labore tempor nostrud ut fugiat do incididunt pariatur est fugiat. Anim deserunt ut excepteur elit.Officia ut enim est culpa irure amet. Consectetur enim consequat ad eu reprehenderit dolor. Velit eu ad laborum sint irure velit. Cupidatat excepteur culpa esse consequat laboris labore est eiusmod ullamco ex sint dolor veniam officia. Ullamco aliqua veniam voluptate laboris quis culpa et velit occaecat laboris aliqua. Pariatur aliquip veniam veniam ipsum anim laborum ipsum ea eu id consectetur nisi. Ea ut aute non minim velit laboris id anim. Consequat et anim veniam cupidatat minim magna fugiat. Voluptate commodo pariatur laborum exercitation commodo veniam. Pariatur nisi adipisicing minim ipsum Lorem nulla sit.',
    jurusan: subjects[0],
    fakultas: subjects[0].fakultas,
    id: '5',
    judul: 'Labore proident sint ullamco ullamco laborum incididunt.',
    tipe: ThesisType.skripsi,
    status: ThesisStatus.takedown,
    users: users.filter((user) => user.tipe_user === userType.user),
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
    waktu_disetujui: new Date(),
  },
  {
    abstrak:
      'Veniam voluptate culpa elit elit qui est pariatur nulla commodo eu elit. Reprehenderit mollit excepteur deserunt eu ea dolore veniam deserunt sit nulla officia eu. Aute laboris labore cupidatat esse ea minim est do sunt incididunt laborum anim dolor. Pariatur deserunt minim aliqua velit occaecat occaecat. Id Lorem ullamco aliqua mollit cupidatat laborum excepteur non dolor nulla do. Amet labore consequat ad fugiat labore tempor nostrud ut fugiat do incididunt pariatur est fugiat. Anim deserunt ut excepteur elit.Officia ut enim est culpa irure amet. Consectetur enim consequat ad eu reprehenderit dolor. Velit eu ad laborum sint irure velit. Cupidatat excepteur culpa esse consequat laboris labore est eiusmod ullamco ex sint dolor veniam officia. Ullamco aliqua veniam voluptate laboris quis culpa et velit occaecat laboris aliqua. Pariatur aliquip veniam veniam ipsum anim laborum ipsum ea eu id consectetur nisi. Ea ut aute non minim velit laboris id anim. Consequat et anim veniam cupidatat minim magna fugiat. Voluptate commodo pariatur laborum exercitation commodo veniam. Pariatur nisi adipisicing minim ipsum Lorem nulla sit.',
    jurusan: subjects[0],
    fakultas: subjects[0].fakultas,
    id: '6',
    judul: 'Labore proident sint ullamco ullamco laborum incididunt.',
    tipe: ThesisType.skripsi,
    status: ThesisStatus.uploaded,
    users: users.filter((user) => user.tipe_user === userType.user),
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
    waktu_disetujui: new Date(),
  },
  {
    abstrak:
      'Veniam voluptate culpa elit elit qui est pariatur nulla commodo eu elit. Reprehenderit mollit excepteur deserunt eu ea dolore veniam deserunt sit nulla officia eu. Aute laboris labore cupidatat esse ea minim est do sunt incididunt laborum anim dolor. Pariatur deserunt minim aliqua velit occaecat occaecat. Id Lorem ullamco aliqua mollit cupidatat laborum excepteur non dolor nulla do. Amet labore consequat ad fugiat labore tempor nostrud ut fugiat do incididunt pariatur est fugiat. Anim deserunt ut excepteur elit.Officia ut enim est culpa irure amet. Consectetur enim consequat ad eu reprehenderit dolor. Velit eu ad laborum sint irure velit. Cupidatat excepteur culpa esse consequat laboris labore est eiusmod ullamco ex sint dolor veniam officia. Ullamco aliqua veniam voluptate laboris quis culpa et velit occaecat laboris aliqua. Pariatur aliquip veniam veniam ipsum anim laborum ipsum ea eu id consectetur nisi. Ea ut aute non minim velit laboris id anim. Consequat et anim veniam cupidatat minim magna fugiat. Voluptate commodo pariatur laborum exercitation commodo veniam. Pariatur nisi adipisicing minim ipsum Lorem nulla sit.',
    jurusan: subjects[0],
    fakultas: subjects[0].fakultas,
    id: '6',
    judul: 'Labore proident sint ullamco ullamco laborum incididunt.',
    tipe: ThesisType.skripsi,
    status: ThesisStatus.uploading,
    users: users.filter((user) => user.tipe_user === userType.user),
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
    waktu_disetujui: new Date(),
  },
];
