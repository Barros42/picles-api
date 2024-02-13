import { IUseCase } from 'src/domain/interfaces/usecase/IUsecase.interface';
import GetSheltherDetailsUseCaseOutput from './dtos/get.shelter.details.usecase.output';
import { Inject, Injectable } from '@nestjs/common';
import IShelterRepository from '../interfaces/shelter.repository.interface';
import ShelterTokens from '../shelter.token';

@Injectable()
export default class GetSheltherDetailsUseCase
  implements IUseCase<null, GetSheltherDetailsUseCaseOutput>
{
  constructor(
    @Inject(ShelterTokens.shelterRepository)
    private readonly shelterRepository: IShelterRepository,
  ) {}

  async run(): Promise<GetSheltherDetailsUseCaseOutput> {
    const shelter = await this.shelterRepository.get();
    return new GetSheltherDetailsUseCaseOutput({
      shelterName: shelter.name,
      shelterEmail: shelter.email,
      shelterPhone: shelter.phone,
      shelterWhatsApp: shelter.whatsApp,
      createdAt: shelter.createdAt,
      updatedAt: shelter.updateAt,
    });
  }
}
