import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CityEntity } from "src/libs/entities/city.entity";
import { RestaurantEntity } from "src/libs/entities/restaurant.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity, CityEntity])],
  exports: [],
  controllers: [],
  providers: [],
})
export class RestaurantModule {}
