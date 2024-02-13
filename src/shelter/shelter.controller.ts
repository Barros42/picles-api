import { Body, Controller, Get, Inject, Put } from '@nestjs/common';
import { IUseCase } from 'src/domain/interfaces/usecase/IUsecase.interface';
import UpdateShelterDetailsControllerInput from './dtos/update.shelter.details.controller.input';
import GetSheltherDetailsUseCaseOutput from 'src/shelter/usecases/dtos/get.shelter.details.usecase.output';
import UpdateSheltherDetailsUseCaseInput from 'src/shelter/usecases/dtos/update.shelter.details.usecase.input';
import UpdateSheltherDetailsUseCaseOutput from 'src/shelter/usecases/dtos/update.shelter.details.usecase.output';
import ShelterTokens from './shelter.token';

@Controller('shelter')
export class ShelterController {
  constructor(
    @Inject(ShelterTokens.getShelterDetailsUseCase)
    private readonly getShelterDetailsUseCase: IUseCase<
      null,
      GetSheltherDetailsUseCaseOutput
    >,

    @Inject(ShelterTokens.updateShelterDetailsUseCase)
    private readonly updateShelterDetailsUsecase: IUseCase<
      UpdateSheltherDetailsUseCaseInput,
      UpdateSheltherDetailsUseCaseOutput
    >,
  ) {}

  @Get()
  async getShelterDetails(): Promise<GetSheltherDetailsUseCaseOutput> {
    return await this.getShelterDetailsUseCase.run(null);
  }

  @Put()
  async updateShelterDetails(
    @Body() input: UpdateShelterDetailsControllerInput,
  ): Promise<UpdateSheltherDetailsUseCaseOutput> {
    const useCaseInput = new UpdateSheltherDetailsUseCaseInput({ ...input });
    return await this.updateShelterDetailsUsecase.run(useCaseInput);
  }
}
