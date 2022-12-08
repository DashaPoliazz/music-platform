import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Track, TrackDocument } from './schemas/track.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = await this.trackModel.create({
      ...createTrackDto,
      listens: 0,
    });

    return track;
  }

  async getAll(): Promise<Track[]> {
    const tracks = await this.trackModel.find();

    return tracks;
  }

  async getOne(trackId: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(trackId).populate('comments');

    return track;
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
}
