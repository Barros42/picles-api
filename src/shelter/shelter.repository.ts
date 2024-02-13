import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Shelter } from './schemas/shelter.schema';
import { Model } from 'mongoose';

@Injectable()
export class ShelterRepository {
    constructor(
        @InjectModel(Shelter.name) 
        private shelterModel: Model<Shelter>
    ) {}

    async get(): Promise<Shelter> {
        return await this.shelterModel.findOne()
    }

    async update(data: Partial<Shelter>) {
        return this.shelterModel.updateOne(null, {
            ...data,
            updateAt: new Date(),
        })
    }
}
