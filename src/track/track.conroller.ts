import { Controller, Post, Delete, Get } from '@nestjs/common';

@Controller('/tracks')
export class TrackController {
  create() {}

  @Get()
  getAll() {
    return 'Wow it doesn`t work';
  }

  getOne() {}

  delete() {}
}
