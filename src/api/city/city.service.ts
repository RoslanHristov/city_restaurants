import { CityEntity } from "src/libs/entities/city.entity";
import { RestaurantEntity } from "src/libs/entities/restaurant.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepository: Repository<RestaurantEntity>
  ) {}

  async findAll(): Promise<CityEntity[]> {
    return await this.cityRepository.find();
  }

  async addCity(newCity): Promise<CityEntity> {
    return await this.cityRepository.save(newCity.city);
  }
}
