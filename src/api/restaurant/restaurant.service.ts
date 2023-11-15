import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { City } from "src/libs/entities/city.entity";
import { Restaurant } from "src/libs/entities/restaurant.entity";
import { Repository } from "typeorm";
import { CreateRestaurantDto } from "./restaurant.dto";

@Injectable()
export class RestaurantSerivce {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>
  ) {}

  async addRestaurant(restaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const { cityId, name } = restaurantDto;
    const city = await this.cityRepository.findOne({ where: { id: cityId } });

    if (!city) {
      throw new NotFoundException(
        `Could not find city with id ${cityId} to add restaurant to`
      );
    }

    return await this.restaurantRepository.save({ name, cityId });
  }
}
