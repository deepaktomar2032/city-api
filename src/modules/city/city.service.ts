import { Injectable } from '@nestjs/common'
import { City } from 'src/types'
import * as data from 'src/data/cities.json'

@Injectable()
export class CityService {
  // Get all cities
  getAllCities(): City[] {
    return data.cities
  }
}
