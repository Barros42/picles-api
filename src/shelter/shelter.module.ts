import { Module } from '@nestjs/common';
import { ShelterRepository } from './shelter.repository';
import GetSheltherDetailsUseCase from './usecases/get.shelter.details.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Shelter, ShelterSchema } from './schemas/shelter.schema';
import UpdateSheltherDetailsUseCase from './usecases/update.shelter.details.usecase';
import { ShelterController } from 'src/shelter/shelter.controller';
import ShelterTokens from './shelter.token';

@Module({
  controllers: [ShelterController],

  imports: [
    MongooseModule.forFeature([{ name: Shelter.name, schema: ShelterSchema }]),
  ],

  providers: [
    {
      provide: ShelterTokens.getShelterDetailsUseCase,
      useClass: GetSheltherDetailsUseCase,
    },
    {
      provide: ShelterTokens.updateShelterDetailsUseCase,
      useClass: UpdateSheltherDetailsUseCase,
    },
    {
      provide: ShelterTokens.shelterRepository,
      useClass: ShelterRepository,
    },
  ],
})
export class ShelterModule {}
