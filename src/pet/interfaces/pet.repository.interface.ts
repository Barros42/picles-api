import FindByFilterAndTotal from '../dtos/find.by.filter.and.total';
import { Pet } from '../schemas/pet.schema';

export default interface IPetRepository {
  getById(id: string): Promise<Pet>;
  create(data: Partial<Pet>): Promise<Pet>;
  update(data: Partial<Pet>): Promise<void>;
  deleteById(petId: string): Promise<void>;
  findByFilter(
    page: number,
    itemsPerPage: number,
    type?: string,
    size?: string,
    gender?: string,
  ): Promise<FindByFilterAndTotal>;
}
