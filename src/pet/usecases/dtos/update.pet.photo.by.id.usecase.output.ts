import UpdatePetByIdUseCaseOutput from "./update.pet.usecase.output"

export default class UpdatePetPhotoByIdUseCaseOutput extends UpdatePetByIdUseCaseOutput {
    constructor(data: Partial<UpdatePetPhotoByIdUseCaseOutput>) {
        super(data)
        Object.assign(this, data)
    }
}
