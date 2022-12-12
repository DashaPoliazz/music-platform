import {
  Controller,
  Body,
  Param,
  Post,
  Delete,
  Get,
  Inject,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'picture',
        maxCount: 1,
      },
      {
        name: 'audio',
        maxCount: 1,
      },
    ]),
  )
  create(@UploadedFiles() files, @Body() createTrackDto: CreateTrackDto) {
    const { picture, audio } = files;

    return this.trackService.create(createTrackDto, picture[0], audio[0]);
  }

  @Get()
  getAll(@Query('amount') amount: number, @Query('offset') offset: number) {
    return this.trackService.getAll(amount, offset);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.trackService.search(query);
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

  @Post('/listen/:trackId')
  listen(@Param('trackId') trackId: ObjectId) {
    this.trackService.listen(trackId);
  }
}
