import { Body, Controller, Get, Inject, Put } from '@nestjs/common';
import { IUseCase } from 'src/domain/interfaces/usecase/IUsecase.interface';
import UpdateShelterDetailsControllerInput from './dtos/update.shelter.details.controller.input';
import GetSheltherDetailsUseCaseInput from 'src/shelter/usecases/dtos/get.shelter.details.usecase.input';
import GetSheltherDetailsUseCaseOutput from 'src/shelter/usecases/dtos/get.shelter.details.usecase.output';
import UpdateSheltherDetailsUseCaseInput from 'src/shelter/usecases/dtos/update.shelter.details.usecase.input';
import UpdateSheltherDetailsUseCaseOutput from 'src/shelter/usecases/dtos/update.shelter.details.usecase.output';

@Controller('shelter')
export class ShelterController {

    constructor(
        @Inject('IUseCase<GetSheltherDetailsUseCaseInput, GetSheltherDetailsUseCaseOutput>')
        private readonly getShelterDetailsUseCase: IUseCase<GetSheltherDetailsUseCaseInput, GetSheltherDetailsUseCaseOutput>,

        @Inject('IUseCase<UpdateSheltherDetailsUseCaseInput, UpdateSheltherDetailsUseCaseOutput>')
        private readonly updateShelterDetailsUsecase: IUseCase<UpdateSheltherDetailsUseCaseInput, UpdateSheltherDetailsUseCaseOutput>
    ) {}

    @Get()
    async getShelterDetails(): Promise<GetSheltherDetailsUseCaseOutput> {
        return await this.getShelterDetailsUseCase.run(new GetSheltherDetailsUseCaseInput())
    }

    @Put()
    async updateShelterDetails(
        @Body() input: UpdateShelterDetailsControllerInput
    ): Promise<UpdateSheltherDetailsUseCaseOutput> {
        const useCaseInput = new UpdateSheltherDetailsUseCaseInput({...input})
        return await this.updateShelterDetailsUsecase.run(useCaseInput)
    }

}
