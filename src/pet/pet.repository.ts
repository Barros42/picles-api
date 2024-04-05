import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pet } from './schemas/pet.schema';
import { Model } from 'mongoose';
import FindByFilterAndTotal from './dtos/find.by.filter.and.total';
import IPetRepository from './interfaces/pet.repository.interface';
import FindPetUseCaseInput from './usecases/dtos/find.pet.usecase.input';

@Injectable()
export class PetRepository implements IPetRepository {
  constructor(
    @InjectModel(Pet.name)
    private petModel: Model<Pet>,
  ) {}

  async getById(id: string): Promise<Pet> {
    return await this.petModel.findOne({ _id: id });
  }

  async create(data: Partial<Pet>): Promise<Pet> {
    return await this.petModel.create({
      ...data,
      createdAt: new Date(),
      updateAt: new Date(),
    });
  }

  async update(data: Partial<Pet>): Promise<void> {
    await this.petModel.updateOne(
      {
        _id: data._id,
      },
      {
        ...data,
        updateAt: new Date(),
      },
    );
  }

  async deleteById(petId: string) {
    await this.petModel.deleteOne({ _id: petId });
  }

  async findByFilter(
    input: FindPetUseCaseInput,
  ): Promise<FindByFilterAndTotal> {
    const FIRST_PAGE = 1;
    const skip =
      input.page == FIRST_PAGE ? 0 : input.itemsPerPage * (input.page - 1);

    let query = this.petModel.find();

    if (input.type) {
      query = query.find({ type: input.type });
    }

    if (input.size) {
      query = query.find({ size: input.size });
    }

    if (input.gender) {
      query = query.find({ gender: input.gender });
    }

    const totalQuery = query.clone().countDocuments();
    const skipQuery = query.clone().skip(skip).limit(input.itemsPerPage);

    const [items, total] = await Promise.all([
      skipQuery.exec(),
      totalQuery.exec(),
    ]);

    return new FindByFilterAndTotal({ items, total });
  }
}
