import { IUseCase } from 'src/domain/interfaces/usecase/IUsecase.interface';
import { PetRepository } from '../pet.repository';
import { Inject, Injectable } from '@nestjs/common';
import PetNotFoundError from 'src/domain/errors/pet.not.found.error';
import { Pet } from '../schemas/pet.schema';
import DeletePetByIdUseCaseInput from './dtos/delete.pet.by.id.usecase.input';
import DeletePetByIdUseCaseOutput from './dtos/delete.pet.by.id.usecase.output';
import PetTokens from '../pet.token';

@Injectable()
export default class DeletePetByIdUseCase
  implements IUseCase<DeletePetByIdUseCaseInput, DeletePetByIdUseCaseOutput>
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: PetRepository,
  ) {}

  async run(
    input: DeletePetByIdUseCaseInput,
  ): Promise<DeletePetByIdUseCaseOutput> {
    const pet = await this.findPetById(input.id);

    if (pet == null) {
      throw new PetNotFoundError();
    }

    await this.petRepository.deleteById(input.id);

    return new DeletePetByIdUseCaseOutput({
      deleted: true,
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
