import { Get, Controller, Inject, Query, BadRequestException } from '@nestjs/common'
import { ApiTags, ApiQuery } from '@nestjs/swagger'
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
    return await this.cityService.getAllCities()
  }

  // Get city by name match (Not exposed to frontend but could be tested in Postman)
  @Get('/search')
  @ApiQuery({ name: 'name', type: String, required: true, description: 'City name to search' })
  async getCityByMatch(@Query('name') name: string): Promise<City[]> {
    if (!name) throw new BadRequestException('The name query parameter is required')
    return await this.cityService.getCityByMatch(name)
  }
}
