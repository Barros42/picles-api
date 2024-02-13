import { Pet } from "src/pet/schemas/pet.schema"

export default class FindPetUseCaseOutput {
    currentPage: number
    totalPages: number
    items: Pet[]

    constructor(data: Partial<FindPetUseCaseOutput>) {
        Object.assign(this, data)
    }
}