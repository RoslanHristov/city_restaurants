import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { City } from "src/libs/entities/city.entity";
import { Restaurant } from "src/libs/entities/restaurant.entity";
import { CityService } from "./city.service";
import { CityController } from "./city.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, City])],
  exports: [CityService],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}