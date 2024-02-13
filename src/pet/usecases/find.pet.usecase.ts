import { IUseCase } from "src/domain/interfaces/usecase/IUsecase.interface";
import { PetRepository } from "../pet.repository";
import { Injectable } from "@nestjs/common";
import FindPetUseCaseInput from "./dtos/find.pet.usecase.input";
import FindPetUseCaseOutput from "./dtos/find.pet.usecase.output";
import FileService from "src/file.service";
import PetResponse from "../dtos/pet.response";

@Injectable()
export default class FindPetUseCase implements IUseCase<FindPetUseCaseInput, FindPetUseCaseOutput> {

    constructor(
        private readonly petRepository: PetRepository,
        private readonly fileService: FileService
    ) { }

    async run(input: FindPetUseCaseInput): Promise<FindPetUseCaseOutput> {

        const queryResponse = await this.petRepository.findByFilter(
            input.page,
            input.itemsPerPage,
            input.type,
            input.size,
            input.gender,
        )

        const petResponseList: PetResponse[] = []

        for(const index in queryResponse.items) {
            const currentPet = queryResponse.items[index]

            if(currentPet.photo != null) {
                const photoInBase64 = await this.fileService.readFile(currentPet.photo)
                queryResponse.items[index].photo = photoInBase64.toString('base64')
            }

            petResponseList.push(PetResponse.fromPet(currentPet))

        }

        const totalPages = Math.ceil(queryResponse.total / input.itemsPerPage)

        return new FindPetUseCaseOutput({
            currentPage: input.page,
            totalPages,
            items: petResponseList
        })
    }
 

}