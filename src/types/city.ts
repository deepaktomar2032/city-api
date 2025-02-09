import { IsString, IsNotEmpty } from 'class-validator'

export type City = {
  name: string
  name_native: string
  country: string
  continent: string
  latitude: string
  longitude: string
  population: string
  founded: string
  landmarks: string[]
}

export class SearchCity {
  @IsNotEmpty({ message: 'The name query parameter is required' })
  @IsString()
  name: string
}
