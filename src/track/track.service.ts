import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Track, TrackDocument } from './schemas/track.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FilesService, FileType } from 'src/files/files.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private filesService: FilesService,
  ) {}

  async create(createTrackDto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioPath = this.filesService.createFile(FileType.AUDIO, audio);
    const picturePath = this.filesService.createFile(FileType.IMAGE, picture);

    const track = await this.trackModel.create({
      ...createTrackDto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });

    return track;
  }

  async getAll(amount = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel
      .find()
      .skip(Number(offset))
      .limit(Number(amount));

    return tracks;
  }

  async getOne(trackId: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(trackId).populate('comments');

    return track;
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: {
        $regex: new RegExp(query, 'i'),
      },
    });

    return tracks;
  }

  async delete(trackId: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(trackId);

    return track.id;
  }

  async addComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(createCommentDto.trackId);
    const comment = await this.commentModel.create({
      ...createCommentDto,
    });

    track.comments.push(comment.id);
    await track.save();

    return comment;
  }

  async listen(trackId: ObjectId) {
    const track = await this.trackModel.findById(trackId);

    track.listens += 1;

    await track.save();
  }
}
