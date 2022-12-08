import { Module } from '@nestjs/common';

import { TrackController } from './track.conroller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
