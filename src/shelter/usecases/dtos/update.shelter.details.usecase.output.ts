export default class UpdateSheltherDetailsUseCaseOutput {
  name: string;
  whatsapp: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<UpdateSheltherDetailsUseCaseOutput>) {
    Object.assign(this, data);
  }
}
