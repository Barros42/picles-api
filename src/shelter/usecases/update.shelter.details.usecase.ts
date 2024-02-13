import { IUseCase } from 'src/domain/interfaces/usecase/IUsecase.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ShelterRepository } from '../shelter.repository';
import UpdateSheltherDetailsUseCaseInput from './dtos/update.shelter.details.usecase.input';
import UpdateSheltherDetailsUseCaseOutput from './dtos/update.shelter.details.usecase.output';
import ShelterTokens from '../shelter.token';

@Injectable()
export default class UpdateSheltherDetailsUseCase
  implements
    IUseCase<
      UpdateSheltherDetailsUseCaseInput,
      UpdateSheltherDetailsUseCaseOutput
    >
{
  constructor(
    @Inject(ShelterTokens.shelterRepository)
    private readonly shelterRepository: ShelterRepository,
  ) {}

  async run(
    input: UpdateSheltherDetailsUseCaseInput,
  ): Promise<UpdateSheltherDetailsUseCaseOutput> {
    await this.shelterRepository.update(input);

    const shelter = await this.shelterRepository.get();

    return new UpdateSheltherDetailsUseCaseOutput({
      name: shelter.name,
      email: shelter.email,
      phone: shelter.phone,
      whatsapp: shelter.whatsApp,
      createdAt: shelter.createdAt,
      updatedAt: shelter.updateAt,
    });
  }
}
