import { IUseCase } from 'src/domain/interfaces/usecase/IUsecase.interface';
import { Inject, Injectable } from '@nestjs/common';
import PetNotFoundError from 'src/domain/errors/pet.not.found.error';
import { Pet } from '../schemas/pet.schema';
import UpdatePetPhotoByIdUseCaseInput from './dtos/update.pet.photo.by.id.usecase.input';
import UpdatePetPhotoByIdUseCaseOutput from './dtos/update.pet.photo.by.id.usecase.output';
import PetTokens from '../pet.token';
import IPetRepository from '../interfaces/pet.repository.interface';
import IFileService from '../interfaces/file.service.interface';

@Injectable()
export default class UpdatePetPhotoByIdUseCase
  implements
    IUseCase<UpdatePetPhotoByIdUseCaseInput, UpdatePetPhotoByIdUseCaseOutput>
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,
    @Inject(PetTokens.fileService)
    private readonly fileService: IFileService,
  ) {}

  async run(
    input: UpdatePetPhotoByIdUseCaseInput,
  ): Promise<UpdatePetPhotoByIdUseCaseOutput> {
    const pet = await this.findPetById(input.id);

    if (pet == null) {
      throw new PetNotFoundError();
    }

    await this.petRepository.update({
      _id: input.id,
      photo: input.photoPath,
    });

    const photo = await this.fileService.readFile(input.photoPath);

    return new UpdatePetPhotoByIdUseCaseOutput({
      id: pet._id,
      name: pet.name,
      type: pet.type,
      size: pet.size,
      gender: pet.gender,
      bio: pet.bio,
      photo: photo.toString('base64'),
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
