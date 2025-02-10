import { Test, TestingModule } from '@nestjs/testing'
import { CityService } from './city.service'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { CACHE_KEY_PREFIX, CACHE_DEFAULT_TIME, message } from 'src/utils'
import { City } from 'src/types'
import * as cityData from 'src/data/cities.json'

describe('CityService', () => {
  let service: CityService
  let cacheManager: { get: jest.Mock; set: jest.Mock }

  beforeEach(async () => {
    cacheManager = {
      get: jest.fn(),
      set: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService, { provide: CACHE_MANAGER, useValue: cacheManager }]
    }).compile()

    service = module.get<CityService>(CityService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getAllCities', () => {
    let originalCities: City[]

    beforeEach(() => {
      originalCities = [...cityData.cities]
    })

    afterEach(() => {
      cityData.cities.length = 0
      cityData.cities.push(...originalCities)
    })

    it('should return all cities', async () => {
      const cities = await service.getAllCities()

      expect(cities).toEqual(cityData.cities)
      expect(cities.length).toBe(cityData.cities.length)
    })

    it('should throw NotFoundException if no cities exist', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      cityData.cities.length = 0

      await expect(service.getAllCities()).rejects.toThrow(NotFoundException)
      consoleErrorSpy.mockRestore()
    })

    it('should throw InternalServerErrorException on unexpected errors', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      jest.spyOn(service, 'getAllCities').mockImplementation(async () => {
        throw new InternalServerErrorException(message.Internal_Server_Error)
      })

      await expect(service.getAllCities()).rejects.toThrow(InternalServerErrorException)

      consoleErrorSpy.mockRestore()
      jest.restoreAllMocks()
    })
  })

  describe('getCityByMatch', () => {
    it('should return cities matching the given name', async () => {
      const name = 'New York'
      const expectedCities = cityData.cities.filter((city) => city.name.toLowerCase().includes(name.toLowerCase()))

      cacheManager.get.mockResolvedValue(null)

      const result = await service.getCityByMatch(name)
      expect(result).toEqual(expectedCities)
      expect(cacheManager.set).toHaveBeenCalledWith(
        `${CACHE_KEY_PREFIX}${name.toLowerCase()}`,
        expectedCities,
        CACHE_DEFAULT_TIME
      )
    })

    it('should return cached data if available', async () => {
      const name = 'Tokyo'
      const cachedCities = cityData.cities.filter((city) => city.name.toLowerCase().includes(name.toLowerCase()))

      cacheManager.get.mockResolvedValue(cachedCities)

      const result = await service.getCityByMatch(name)
      expect(result).toEqual(cachedCities)
      expect(cacheManager.get).toHaveBeenCalledWith(`${CACHE_KEY_PREFIX}${name.toLowerCase()}`)
    })

    it('should throw a NotFoundException if no city matches the given name', async () => {
      const cityName = 'Atlantis'
      cacheManager.get.mockResolvedValue(null)
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      await expect(service.getCityByMatch(cityName)).rejects.toThrow(NotFoundException)
      expect(cacheManager.set).not.toHaveBeenCalled()

      consoleErrorSpy.mockRestore()
    })
  })
})
