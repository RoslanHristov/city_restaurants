import { City } from "src/libs/entities/city.entity";
import { Restaurant } from "src/libs/entities/restaurant.entity";
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, IsNull } from "typeorm";
import { CreateCityDto } from "./city.dto";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>
  ) {}

  /**
   * Add new city
   * @param {CreateCityDto} newCity
   * @returns {Promise<City>}
   */
  async addCity(newCity: CreateCityDto): Promise<City> {
    // Trivial error handling like this is not necessary since im using class-validator in the DTO
    // if (!name) {
    //   throw new ConflictException("City name is required");
    // }
    return await this.cityRepository.save(newCity);
  }

  /**
   * Returns a list of all cities
   * @returns {Promise<City[]>}
   */
  async findAllCities(): Promise<City[]> {
    const cities: City[] = await this.cityRepository.find();
    if (!cities) {
      throw new NotFoundException("No cities found");
    }
    return cities;
  }

  async findCityById(id: string): Promise<City> {
    const city: City = await this.cityRepository.findOne({ where: { id } });
    if (!city) {
      throw new NotFoundException(`City with id ${id} not found`);
    }
    return city;
  }

  async findAllRestaurantsByCityId(id): Promise<Restaurant[]> {
    const restaurants: Restaurant[] = await this.restaurantRepository.find({
      where: { city: { id } },
    });
    if (!restaurants) {
      throw new NotFoundException(`No restaurants found in city with id ${id}`);
    }
    return restaurants;
  }

  async findAllCitiesWithRestaurants(): Promise<City[]> {
    try {
      const citiesWithRestarants: City[] = await this.cityRepository.find({
        relations: { restaurants: true },
      });

      if (!citiesWithRestarants) {
        throw new NotFoundException("No restourants found in the given city");
      }

      for (const city of citiesWithRestarants) {
        if (city.restaurants.length === 0) {
          city.restaurants = null;
        }
      }

      const filteredCities: City[] = citiesWithRestarants.filter(
        (city) => city.restaurants !== null
      );
      return filteredCities;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async deleteCityById(id: string): Promise<void> {
    try {
      const city: City = await this.cityRepository.findOneBy({ id });
      if (!city) {
        throw new NotFoundException(`City with id ${id} not found`);
      }

      const restaurants: Restaurant[] = await this.restaurantRepository.find({
        where: { city: { id } },
      });

      if (restaurants.length > 0) {
        throw new ConflictException(
          `City with id ${id} has restaurants. Please delete them first`
        );
      }

      await this.cityRepository.delete(id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateCityById(id: string, newCity: CreateCityDto): Promise<City> {
    try {
      const city: City = await this.cityRepository.findOne({ where: { id } });
      if (!city) {
        throw new NotFoundException(`City with id ${id} not found`);
      }
      await this.cityRepository.update(id, newCity);
      return await this.cityRepository.findOne({ where: { id } });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
