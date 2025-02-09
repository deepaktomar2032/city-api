import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'
import { AppController } from 'src/app.controller'
import { AppService } from 'src/app.service'
import { CityModule } from 'src/modules/city/city.module'
import { CACHE_DEFAULT_TIME } from 'src/utils'

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register({ ttl: CACHE_DEFAULT_TIME, isGlobal: true }), CityModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
