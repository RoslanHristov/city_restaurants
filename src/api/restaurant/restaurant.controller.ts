import { HttpStatus } from '@nestjs/common/enums';
import { Controller, Body, Res, Post } from "@nestjs/common";
import { RestaurantSerivce } from "./restaurant.service";
import { CreateRestaurantDto } from "./restaurant.dto";
import { Response } from "express";

@Controller("restaurant")
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantSerivce) {}

    @Post()
    async addCity(
      @Body() createRestaurantDto: CreateRestaurantDto,
      @Res() res: Response
    ): Promise<void> {
      const city = await this.restaurantService.addRestaurant(createRestaurantDto);
      res.status(HttpStatus.CREATED).json({ city });
    }
}
