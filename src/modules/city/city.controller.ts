import { Get, Controller, Inject, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CityService } from './city.service'
import { City, SearchCity } from 'src/types'
import { API_V1_ROUTE } from 'src/utils'

@ApiTags('City')
@Controller(`${API_V1_ROUTE}`)
export class CityController {
  @Inject() private readonly cityService: CityService

  // Get all cities
  @Get('/city')
  async getAllCities(): Promise<City[]> {
    return await this.cityService.getAllCities()
  }

  // Get city by name match (Not exposed to frontend but could be tested in Postman)
  @Get('/search')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getCityByMatch(@Query() query: SearchCity): Promise<City[]> {
    return await this.cityService.getCityByMatch(query.name)
  }
}
