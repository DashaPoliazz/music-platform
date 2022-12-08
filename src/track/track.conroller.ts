import {
  Controller,
  Body,
  Param,
  Post,
  Delete,
  Get,
  Inject,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':trackId')
  getOne(@Param('trackId') trackId: ObjectId) {
    return this.trackService.getOne(trackId);
  }

  @Delete(':trackId')
  delete(@Param('trackId') trackId: ObjectId) {
    return this.trackService.delete(trackId);
  }

  @Post('/comment')
  addComment(@Body() createCommentDto: CreateCommentDto) {
    return this.trackService.addComment(createCommentDto);
  }
}
