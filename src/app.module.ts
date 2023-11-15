import { Module } from "@nestjs/common";
import { CityModule } from "./api/city/city.module";
import { RestaurantModule } from "./api/restaurant/restaurant.module";
import { DatabaseModule } from "./libs/database.module";

@Module({
  imports: [
    RestaurantModule,
    CityModule,
    DatabaseModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
