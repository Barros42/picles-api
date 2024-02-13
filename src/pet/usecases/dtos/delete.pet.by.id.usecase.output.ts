export default class DeletePetByIdUseCaseOutput {
  deleted: boolean;

  constructor(data: Partial<DeletePetByIdUseCaseOutput>) {
    Object.assign(this, data);
  }
}
