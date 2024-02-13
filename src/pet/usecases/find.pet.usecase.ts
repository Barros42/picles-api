import { IUseCase } from "src/domain/interfaces/usecase/IUsecase.interface";
import { PetRepository } from "../pet.repository";
import { Injectable } from "@nestjs/common";
import FindPetUseCaseInput from "./dtos/find.pet.usecase.input";
import FindPetUseCaseOutput from "./dtos/find.pet.usecase.output";

@Injectable()
export default class FindPetUseCase implements IUseCase<FindPetUseCaseInput, FindPetUseCaseOutput> {

    constructor(
        private readonly petRepository: PetRepository
    ) { }

    async run(input: FindPetUseCaseInput): Promise<FindPetUseCaseOutput> {
        const pets = await this.petRepository.findByFilter(
            input.page,
            input.itemsPerPage,
            input.type,
            input.size,
            input.gender,
        )
       
        return new FindPetUseCaseOutput({
            currentPage: input.page,
            totalPages: Math.ceil(pets.total / input.itemsPerPage),
            items: pets.items
        })
    }
 

}