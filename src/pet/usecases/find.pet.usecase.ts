import { IUseCase } from 'src/domain/interfaces/usecase/IUsecase.interface';
import { Inject, Injectable } from '@nestjs/common';
import FindPetUseCaseInput from './dtos/find.pet.usecase.input';
import FindPetUseCaseOutput from './dtos/find.pet.usecase.output';
import PetResponse from '../dtos/pet.response';
import PetTokens from '../pet.token';
import IPetRepository from '../interfaces/pet.repository.interface';
import IFileService from '../interfaces/file.service.interface';

@Injectable()
export default class FindPetUseCase
  implements IUseCase<FindPetUseCaseInput, FindPetUseCaseOutput>
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,
    @Inject(PetTokens.fileService)
    private readonly fileService: IFileService,
  ) {}

  async run(input: FindPetUseCaseInput): Promise<FindPetUseCaseOutput> {

    const queryResponse = await this.petRepository.findByFilter(input);

    const petResponseList: PetResponse[] = [];

    for (const currentPet of queryResponse.items) {
        if (currentPet.photo) {
            const photoInBase64 = await this.fileService.readFile(currentPet.photo);
            currentPet.photo = photoInBase64.toString('base64');
        }

        petResponseList.push(PetResponse.fromPet(currentPet));
    }

    const totalPages = Math.ceil(queryResponse.total / input.itemsPerPage);

    return new FindPetUseCaseOutput({
      currentPage: input.page,
      totalPages,
      items: petResponseList,
    });
  }
}
