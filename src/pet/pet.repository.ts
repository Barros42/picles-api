import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pet } from './schemas/pet.schema';
import { Model } from 'mongoose';
import FindByFilterAndTotal from './dtos/find.by.filter.and.total';

@Injectable()
export class PetRepository {
    constructor(
        @InjectModel(Pet.name) 
        private petModel: Model<Pet>
    ) {}

    async getById(id: string): Promise<Pet> {
        return await this.petModel.findOne({ _id: id })
    }

    async create(data: Partial<Pet>) {
        return this.petModel.create({
            ...data,
            createdAt: new Date(),
            updateAt: new Date(),
        })
    }

    async update(data: Partial<Pet>) {
        return this.petModel.updateOne({
            _id: data._id
        }, {
            ...data,
            updateAt: new Date(),
        })
    }

    async deleteById(petId: string) {
        return await this.petModel.deleteOne({ _id: petId })
    }

    async findByFilter(page: number, itemsPerPage: number, type?: string, size?: string, gender?: string): Promise<FindByFilterAndTotal> {

        const FIRST_PAGE = 1
        const skip = (page == FIRST_PAGE) ? 0 : (itemsPerPage * (page - 1))

        let query = this.petModel.find()

        if (!!type) {
            query = query.find({ type })
        }

        if (!!size) {
            query = query.find({ size })
        }

        if (!!gender) {
            query = query.find({ gender })
        }

        const totalQuery = query.clone().countDocuments()
        const skipQuery = query.clone().skip(skip).limit(itemsPerPage)

        return new FindByFilterAndTotal({
            items: await skipQuery.exec(),
            total: await totalQuery.exec()
        })

    }
}
