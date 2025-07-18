import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}
  getVersion() {
    return '12.9v';
  }
}
