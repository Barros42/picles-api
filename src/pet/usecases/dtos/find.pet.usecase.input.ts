export default class FindPetUseCaseInput {
  type?: string;
  size?: string;
  gender?: string;
  page: number;
  itemsPerPage: number;

  constructor(data: Partial<FindPetUseCaseInput>) {
    Object.assign(this, data);
  }
}
