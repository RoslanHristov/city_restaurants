import { City } from "src/libs/entities/city.entity";
import { Restaurant } from "src/libs/entities/restaurant.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>
  ) {}

  async addCity(newCity): Promise<City> {
    return await this.cityRepository.save(newCity);
  }

  async findAllCities(): Promise<City[]> {
    const cities = await this.cityRepository.find();
    if (!cities) {
      throw new NotFoundException("No cities found");
    }
    return cities;
  }

  async findCityById(id: number): Promise<City> {
    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) {
      throw new NotFoundException(`City with id ${id} not found`);
    }
    return city;
  }

  async findAllRestaurantsByCityId(id: number): Promise<Restaurant[]> {
    const restaurants = await this.restaurantRepository.find({
      where: { city: { id } },
    });
    if (!restaurants) {
      throw new NotFoundException(`No restaurants found in city with id ${id}`);
    }
    return restaurants;
  }

  async findAllCitiesWithRestaurants(): Promise<City[]> {
    const citiesWithRestarants = await this.cityRepository.find({
      relations: ["restaurants"],
    });
    if (!citiesWithRestarants) {
      throw new NotFoundException("No restourants found in the given city");
    }
    return citiesWithRestarants;
  }
}
