import { Controller, Get, Inject } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { API_V1_ROUTE } from 'src/utils'
import { AppService } from './app.service'

@Controller(`${API_V1_ROUTE}`)
export class AppController {
  @Inject() private readonly appService: AppService

  @ApiTags('Healt Check')
  @Get(`/health`)
  healthCheck(): string {
    return this.appService.healthCheck()
  }
}
