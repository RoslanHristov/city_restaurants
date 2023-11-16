import {
  Injectable,
  NotFoundException,
  // ConflictException,
  BadRequestException,
} from "@nestjs/common";
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

  /**
   * Add new restaurant to city
   * @param {CreateRestaurantDto} restaurantDto
   * @returns {Promise<Restaurant>}
   */
  async addRestaurant(restaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const { cityId, name, food } = restaurantDto;
    const city = await this.cityRepository.findOne({ where: { id: cityId } });

    if (!city) {
      throw new NotFoundException(
        `Could not find city with id ${cityId} to add restaurant to`
      );
    }
    // Trivial error handling like this is not necessary since im using class-validator in the DTO
    // if (!name) {
    //   throw new ConflictException("Restaurant name is required");
    // }
    return await this.restaurantRepository.save({ name, cityId, food });
  }

  /**
   * Get all restaurants in city by cityId
   * @param {strubg} cityId
   * @returns {Promise<Restaurant[]>}
   */
  async getAllRestaurantsInCity(cityId: string): Promise<Restaurant[]> {
    try {
      const allRestaraunts = await this.restaurantRepository.find({
        where: { cityId },
      });
      if (!allRestaraunts) {
        throw new NotFoundException(
          `No restaurants found in city with id ${cityId}`
        );
      }
      return allRestaraunts;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllRestaurants(): Promise<Restaurant[]> {
    try {
      const allRestaraunts = await this.restaurantRepository.find();
      if (!allRestaraunts) {
        throw new NotFoundException(`No restaurants found`);
      }
      return allRestaraunts;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllRestaurantsInCityByFood(cityId, food): Promise<Restaurant[]> {
    try {
      const allRestaraunts = await this.restaurantRepository.find({
        where: { cityId, food },
      });
      if (!allRestaraunts) {
        throw new NotFoundException(
          `No restaurants found in city with id ${cityId}`
        );
      }
      return allRestaraunts;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteRestaurantById(id: string): Promise<void> {
    try {
      const deletedRestaurant = await this.restaurantRepository.findOne({
        where: { id },
      });
      if (!deletedRestaurant) {
        throw new NotFoundException(
          `Could not find restaurant with id ${id} to delete`
        );
      }
      await this.restaurantRepository.delete({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
