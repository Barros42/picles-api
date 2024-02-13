import { Module } from '@nestjs/common';
import { ShelterRepository } from './shelter.repository';
import GetSheltherDetailsUseCase from './usecases/get.shelter.details.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Shelter, ShelterSchema } from './schemas/shelter.schema';
import UpdateSheltherDetailsUseCase from './usecases/update.shelter.details.usecase';
import { ShelterController } from 'src/shelter/shelter.controller';

@Module({
  controllers: [
    ShelterController
  ],

  imports: [
    MongooseModule.forFeature([{ name: Shelter.name, schema: ShelterSchema }])
  ],

  providers: [
    {
      provide: 'IUseCase<GetSheltherDetailsUseCaseInput, GetSheltherDetailsUseCaseOutput>',
      useClass: GetSheltherDetailsUseCase
    },
    {
      provide: 'IUseCase<UpdateSheltherDetailsUseCaseInput, UpdateSheltherDetailsUseCaseOutput>',
      useClass: UpdateSheltherDetailsUseCase
    },
    ShelterRepository
  ]
  
})
export class ShelterModule {}
