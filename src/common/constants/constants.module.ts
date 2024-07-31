import { Module } from '@nestjs/common';
import { TypeOrmConfig } from './db';

@Module({
  imports: [TypeOrmConfig],
})
export class ConstantsModule {}
