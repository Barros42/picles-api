import { Module } from '@nestjs/common';
import { ShelterModule } from './shelter/shelter.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PetModule } from './pet/pet.module';
import { MulterModule } from '@nestjs/platform-express';
import multerConfig from './config/multerConfig';

@Module({
  imports: [
    MulterModule,
    MongooseModule.forRoot('mongodb+srv://mdbf42:teste123@piclescluster.1noagfe.mongodb.net/picles?retryWrites=true&w=majority'),
    ShelterModule,
    PetModule
  ]
})
export class AppModule {}
