import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetRepository } from './pet.repository';
import CreatePetUseCase from './usecases/create.pet.usecase';
import PetTokens from './pet.token';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './schemas/pet.schema';
import FindPetByIdUseCase from './usecases/find.pet.by.id.usecase';
import UpdatePetByIdUseCase from './usecases/update.pet.by.id.usecase';
import DeletePetByIdUseCase from './usecases/delete.pet.by.id.usecase';
import FindPetUseCase from './usecases/find.pet.usecase';

@Module({
  controllers: [PetController],
  imports: [
    MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }])
  ],
  providers: [
    {
      provide: PetTokens.createPetUseCase,
      useClass: CreatePetUseCase
    },
    {
      provide: PetTokens.findPetByIdUseCase,
      useClass: FindPetByIdUseCase
    },
    {
      provide: PetTokens.updatePetByIdUseCase,
      useClass: UpdatePetByIdUseCase
    },
    {
      provide: PetTokens.deletePetByIdUseCase,
      useClass: DeletePetByIdUseCase
    },
    {
      provide: PetTokens.findPetUseCase,
      useClass: FindPetUseCase
    },
    PetRepository
  ]
})
export class PetModule {}
