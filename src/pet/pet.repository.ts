import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pet } from './schemas/pet.schema';
import { Model } from 'mongoose';

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
}
