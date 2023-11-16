import { HttpStatus } from "@nestjs/common/enums";
import {
  Controller,
  Body,
  Res,
  Post,
  Get,
  Param,
  Delete,
} from "@nestjs/common";
import { RestaurantSerivce } from "./restaurant.service";
import { CreateRestaurantDto } from "./restaurant.dto";
import { Response } from "express";

@Controller("restaurant")
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantSerivce) {}

  @Post()
  async addRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @Res() res: Response
  ): Promise<void> {
    const city = await this.restaurantService.addRestaurant(
      createRestaurantDto
    );
    res.status(HttpStatus.CREATED).json({ city });
  }

  @Get("/:cityId")
  async getAllRestaurantsInCity(
    @Param("cityId") id: string,
    @Res() res: Response
  ): Promise<void> {
    const restaurants = await this.restaurantService.getAllRestaurantsInCity(
      id
    );
    res.status(HttpStatus.OK).json({ restaurants });
  }

  @Get("/:cityId/:food")
  async getAllRestaurantsInCityByFood(
    @Param("cityId") cityId: string,
    @Param("food") food: string,
    @Res() res: Response
  ): Promise<void> {
    const restaurants =
      await this.restaurantService.getAllRestaurantsInCityByFood(cityId, food);
    res.status(HttpStatus.OK).json({ restaurants });
  }

  @Get()
  async getAllRestaurants(@Res() res: Response): Promise<void> {
    const restaurants = await this.restaurantService.getAllRestaurants();
    res.status(HttpStatus.OK).json({ restaurants });
  }

  @Delete("/:id")
  async deleteRestaurantById(
    @Param("id") id: string,
    @Res() res: Response
  ): Promise<void> {
    const deletedRestaurant = await this.restaurantService.deleteRestaurantById(
      id
    );
    res.status(HttpStatus.OK).json({ deletedRestaurant });
  }
}
