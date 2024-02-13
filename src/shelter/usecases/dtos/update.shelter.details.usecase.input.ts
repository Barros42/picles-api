export default class UpdateSheltherDetailsUseCaseInput {
    name: string
    whatsapp: string
    email: string
    phone: string

    constructor(data: Partial<UpdateSheltherDetailsUseCaseInput>) {
        Object.assign(this, data)
    }
}