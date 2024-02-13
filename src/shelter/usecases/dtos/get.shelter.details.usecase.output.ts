export default class GetSheltherDetailsUseCaseOutput {
  shelterName: string;
  shelterWhatsApp: string;
  shelterEmail: string;
  shelterPhone: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<GetSheltherDetailsUseCaseOutput>) {
    Object.assign(this, data);
  }
}
