import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { City } from "src/libs/entities/city.entity";
import { Restaurant } from "src/libs/entities/restaurant.entity";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantSerivce } from "./restaurant.service";

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, City])],
  exports: [RestaurantSerivce],
  controllers: [RestaurantController],
  providers: [RestaurantSerivce],
})
export class RestaurantModule {}
