import { Module } from '@nestjs/common';
import { ShelterModule } from './shelter/shelter.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PetModule } from './pet/pet.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../public'),
      serveRoot: '/public/',
    }),
    MulterModule,
    MongooseModule.forRoot(
      'mongodb+srv://mdbf42:teste123@piclescluster.1noagfe.mongodb.net/picles?retryWrites=true&w=majority',
    ),
    ShelterModule,
    PetModule,
  ],
})
export class AppModule {}
