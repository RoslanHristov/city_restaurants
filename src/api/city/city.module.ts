import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CityEntity } from "src/libs/entities/city.entity";
import { RestaurantEntity } from "src/libs/entities/restaurant.entity";
import { CityService } from "./city.service";

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity, CityEntity])],
  exports: [CityService],
  controllers: [],
  providers: [CityService],
})
export class CityModule {}