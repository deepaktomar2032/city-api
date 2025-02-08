import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from 'src/app.controller'
import { AppService } from 'src/app.service'
import { CityModule } from 'src/modules/city/city.module'

@Module({
  imports: [ConfigModule.forRoot(), CityModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
