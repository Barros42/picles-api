export default class FindPetByIdUseCaseOutput {
  id: string;
  name: string;
  type: string;
  size: string;
  gender: string;
  bio: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<FindPetByIdUseCaseOutput>) {
    Object.assign(this, data);
  }
}
