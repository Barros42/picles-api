import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Query } from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import CreatePetUseCaseOutput from './usecases/dtos/create.pet.usecase.output';
import CreatePetUseCaseInput from './usecases/dtos/create.pet.usecase.input';
import { IUseCase } from 'src/domain/interfaces/usecase/IUsecase.interface';
import PetTokens from './pet.token';
import FindPetByIdUseCaseOutput from './usecases/dtos/find.pet.by.id.usecase.output';
import FindPetByIdUseCaseInput from './usecases/dtos/find.pet.by.id.usecase.input';
import UpdatePetByIdControllerInput from './dtos/update.pet.by.id.controller.input';
import UpdatePetByIdUseCaseOutput from './usecases/dtos/update.pet.usecase.output';
import UpdatePetByIdUseCaseInput from './usecases/dtos/update.pet.by.id.usecase.input';
import DeletePetByIdUseCaseInput from './usecases/dtos/delete.pet.by.id.usecase.input';
import DeletePetByIdUseCaseOutput from './usecases/dtos/delete.pet.by.id.usecase.output';
import FindPetUseCaseInput from './usecases/dtos/find.pet.usecase.input';
import FindPetUseCaseOutput from './usecases/dtos/find.pet.usecase.output';

@Controller('pet')
export class PetController {

    constructor(
        @Inject(PetTokens.createPetUseCase)
        private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>,

        @Inject(PetTokens.findPetByIdUseCase)
        private readonly findPetByIdUseCase: IUseCase<FindPetByIdUseCaseInput, FindPetByIdUseCaseOutput>,

        @Inject(PetTokens.updatePetByIdUseCase)
        private readonly updatePetByIdUseCase: IUseCase<UpdatePetByIdUseCaseInput, UpdatePetByIdUseCaseOutput>,

        @Inject(PetTokens.deletePetByIdUseCase)
        private readonly deletePetByIdUseCase: IUseCase<DeletePetByIdUseCaseInput, DeletePetByIdUseCaseOutput>,

        @Inject(PetTokens.findPetUseCase)
        private readonly findPetUseCase: IUseCase<FindPetUseCaseInput, FindPetUseCaseOutput>,
    ) {}

    @Get()
    async getPets(
        @Query('type') type?: string,
        @Query('size') size?: string,
        @Query('gender') gender?: string,
        @Query('page') page?: string,
        @Query('itemsPerPage') itemsPerPage?: string,
    ): Promise<FindPetUseCaseOutput> {
       try {
        const FIRST_PAGE = 1
        const DEFAULT_items_PER_PAGE = 10
        const useCaseInput = new FindPetUseCaseInput({
            type: !!type ? type : null,
            size: !!size ? size : null,
            gender: !!gender ? gender : null,
            page: !!page ? parseInt(page) : FIRST_PAGE,
            itemsPerPage: !!itemsPerPage ? parseInt(itemsPerPage) : DEFAULT_items_PER_PAGE
        })
        return await this.findPetUseCase.run(useCaseInput)
       } catch (e) {
        console.log(e)
        throw new BadRequestException(
            JSON.parse(e.message)
        )
       }
    }

    @Get(':id')
    async getPetById(@Param('id') petId: string): Promise<FindPetByIdUseCaseOutput> {
       try {
        const useCaseInput = new FindPetByIdUseCaseInput({ id: petId })
        return await this.findPetByIdUseCase.run(useCaseInput)
       } catch (e) {
        throw new BadRequestException(
            JSON.parse(e.message)
        )
       }
    }

    @Post()
    async createPet(@Body() input: CreatePetControllerInput): Promise<CreatePetUseCaseOutput> {
        const useCaseInput = new CreatePetUseCaseInput({...input})
        return await this.createPetUseCase.run(useCaseInput)
    }

    @Put('/:id')
    async updatePetById(
        @Param('id') petId: string,
        @Body() input: UpdatePetByIdControllerInput
    ): Promise<UpdatePetByIdUseCaseOutput> {
        try {
            const useCaseInput = new UpdatePetByIdUseCaseInput({ ...input, id: petId})
            return await this.updatePetByIdUseCase.run(useCaseInput)
           } catch (e) {
            throw new BadRequestException(
                JSON.parse(e.message)
            )
           }
    }

    @Delete('/:id')
    async deletePetById(@Param('id') petId: string): Promise<DeletePetByIdUseCaseOutput> {
       try {
        const useCaseInput = new DeletePetByIdUseCaseInput({ id: petId })
        return await this.deletePetByIdUseCase.run(useCaseInput)
       } catch (e) {
        throw new BadRequestException(
            JSON.parse(e.message)
        )
       }
    }

}
