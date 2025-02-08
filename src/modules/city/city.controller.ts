import { Get, Controller, Inject } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CityService } from './city.service'
import { City } from 'src/types'
import { API_V1_ROUTE } from 'src/utils'

@ApiTags('City')
@Controller(`${API_V1_ROUTE}`)
export class CityController {
  @Inject() private readonly cityService: CityService

  // Get all cities
  @Get('/city')
  async getAllCities(): Promise<City[]> {
    return this.cityService.getAllCities()
  }
}
