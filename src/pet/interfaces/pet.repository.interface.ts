import FindByFilterAndTotal from '../dtos/find.by.filter.and.total';
import { Pet } from '../schemas/pet.schema';
import FindPetUseCaseInput from '../usecases/dtos/find.pet.usecase.input';

export default interface IPetRepository {
  getById(id: string): Promise<Pet>;
  create(data: Partial<Pet>): Promise<Pet>;
  update(data: Partial<Pet>): Promise<void>;
  deleteById(petId: string): Promise<void>;
  findByFilter(input: FindPetUseCaseInput): Promise<FindByFilterAndTotal>;
}
