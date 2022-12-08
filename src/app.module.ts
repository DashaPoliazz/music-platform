import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TrackModule } from './track/track.module';

@Module({
  imports: [
    TrackModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.zjinxpc.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
