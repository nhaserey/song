import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SongModule } from './song/song.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';

@Module({
  imports: [SongModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({path: 'songs',method: RequestMethod.POST});
  }
}
