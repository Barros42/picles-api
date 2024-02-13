import { IUseCase } from "src/domain/interfaces/usecase/IUsecase.interface";
import GetSheltherDetailsUseCaseInput from "./dtos/get.shelter.details.usecase.input";
import GetSheltherDetailsUseCaseOutput from "./dtos/get.shelter.details.usecase.output";
import { Inject, Injectable } from "@nestjs/common";
import { ShelterRepository } from "../shelter.repository";

@Injectable()
export default class GetSheltherDetailsUseCase implements IUseCase<GetSheltherDetailsUseCaseInput, GetSheltherDetailsUseCaseOutput> {

    constructor(
        private readonly shelterRepository: ShelterRepository
    ) { }

    async run(input: GetSheltherDetailsUseCaseInput): Promise<GetSheltherDetailsUseCaseOutput> {

        const shelter = await this.shelterRepository.get()

        return new GetSheltherDetailsUseCaseOutput({
            shelterName: shelter.name,
            shelterEmail: shelter.email,
            shelterPhone: shelter.phone,
            shelterWhatsApp: shelter.whatsApp,
            createdAt: shelter.createdAt,
            updatedAt: shelter.updateAt
        })

    }

} 