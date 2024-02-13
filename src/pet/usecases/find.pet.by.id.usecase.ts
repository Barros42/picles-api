import { IUseCase } from 'src/domain/interfaces/usecase/IUsecase.interface';
import CreatePetUseCaseOutput from './dtos/create.pet.usecase.output';
import { Inject, Injectable } from '@nestjs/common';
import FindPetByIdUseCaseInput from './dtos/find.pet.by.id.usecase.input';
import FindPetByIdUseCaseOutput from './dtos/find.pet.by.id.usecase.output';
import PetNotFoundError from 'src/domain/errors/pet.not.found.error';
import { Pet } from '../schemas/pet.schema';
import PetTokens from '../pet.token';
import IPetRepository from '../interfaces/pet.repository.interface';
import IFileService from '../interfaces/file.service.interface';

@Injectable()
export default class FindPetByIdUseCase
  implements IUseCase<FindPetByIdUseCaseInput, FindPetByIdUseCaseOutput>
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,

    @Inject(PetTokens.fileService)
    private readonly fileService: IFileService,
  ) {}

  async run(input: FindPetByIdUseCaseInput): Promise<FindPetByIdUseCaseOutput> {
    const pet = await this.findPetById(input.id);

    if (pet == null) {
      throw new PetNotFoundError();
    }

    const petPhoto = !!pet.photo
      ? (await this.fileService.readFile(pet.photo)).toString('base64')
      : null;

    return new CreatePetUseCaseOutput({
      id: pet._id,
      name: pet.name,
      type: pet.type,
      size: pet.size,
      gender: pet.gender,
      bio: pet.bio,
      photo: petPhoto,
      createdAt: pet.createdAt,
      updatedAt: pet.updateAt,
    });
  }

  private async findPetById(id: string): Promise<Pet> {
    try {
      return await this.petRepository.getById(id);
    } catch {
      return null;
    }
  }
}
