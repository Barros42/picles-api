export default class FindPetByIdUseCaseInput {
  id: string;

  constructor(data: Partial<FindPetByIdUseCaseInput>) {
    Object.assign(this, data);
  }
}
