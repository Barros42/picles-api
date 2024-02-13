import PetResponse from "src/pet/dtos/pet.response"
import { Pet } from "src/pet/schemas/pet.schema"

export default class FindPetUseCaseOutput {
    currentPage: number
    totalPages: number
    items: PetResponse[]

    constructor(data: Partial<FindPetUseCaseOutput>) {
        Object.assign(this, data)
    }
}