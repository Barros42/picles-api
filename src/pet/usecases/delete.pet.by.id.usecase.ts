import { IUseCase } from "src/domain/interfaces/usecase/IUsecase.interface";
import CreatePetUseCaseInput from "./dtos/create.pet.usecase.input";
import CreatePetUseCaseOutput from "./dtos/create.pet.usecase.output";
import { PetRepository } from "../pet.repository";
import { Injectable } from "@nestjs/common";
import FindPetByIdUseCaseInput from "./dtos/find.pet.by.id.usecase.input";
import FindPetByIdUseCaseOutput from "./dtos/find.pet.by.id.usecase.output";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import { Pet } from "../schemas/pet.schema";
import DeletePetByIdUseCaseInput from "./dtos/delete.pet.by.id.usecase.input";
import DeletePetByIdUseCaseOutput from "./dtos/delete.pet.by.id.usecase.output";

@Injectable()
export default class DeletePetByIdUseCase implements IUseCase<DeletePetByIdUseCaseInput, DeletePetByIdUseCaseOutput> {

    constructor(
        private readonly petRepository: PetRepository
    ) { }

    async run(input: DeletePetByIdUseCaseInput): Promise<DeletePetByIdUseCaseOutput> {
        
        const pet = await this.findPetById(input.id)

        if (pet == null) {
            throw new PetNotFoundError()
        }

        await this.petRepository.deleteById(input.id)

        return new DeletePetByIdUseCaseOutput({
           deleted: true
        })
    }

    private async findPetById(id: string): Promise<Pet> {
        try {
            return (await this.petRepository.getById(id))
        } catch {
            return null
        }
    }

}