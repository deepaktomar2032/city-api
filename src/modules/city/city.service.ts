import { Inject, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { City } from 'src/types'
import { CACHE_KEY_PREFIX, CACHE_DEFAULT_TIME, message } from 'src/utils'
import * as cityData from 'src/data/cities.json'

@Injectable()
export class CityService {
  @Inject(CACHE_MANAGER) private readonly cacheManager: Cache

  // Get all cities
  async getAllCities(): Promise<City[]> {
    try {
      if (cityData.cities.length === 0) throw new NotFoundException(message.No_City_Found)
      return cityData.cities
    } catch (error: unknown) {
      console.error(`CityService:getAllCities: ${error}`)
      if (error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(message.Internal_Server_Error)
      }
      throw error
    }
  }

  // Get city by name match
  async getCityByMatch(name: string): Promise<City[]> {
    try {
      const cacheKey: string = `${CACHE_KEY_PREFIX}${name.toLowerCase()}`
      const cachedResult: City[] = await this.cacheManager.get<City[]>(cacheKey)
      if (cachedResult) return cachedResult

      const filteredCities: City[] = cityData.cities.filter((city) =>
        city.name.toLowerCase().includes(name.toLowerCase())
      )
      if (filteredCities.length === 0) throw new NotFoundException(message.No_City_Found)

      await this.cacheManager.set(cacheKey, filteredCities, CACHE_DEFAULT_TIME)
      return filteredCities
    } catch (error: unknown) {
      console.error(`CityService:getCityByMatch: ${error}`)
      if (error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(message.Internal_Server_Error)
      }
      throw error
    }
  }
}
