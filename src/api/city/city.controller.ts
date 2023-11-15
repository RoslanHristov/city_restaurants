import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Logger,
  Param,
} from "@nestjs/common";
import { CityService } from "./city.service";
import { CreateCityDto } from "./city.dto";
import { HttpStatus } from "@nestjs/common/enums";
import { Response } from "express";

@Controller("city")
export class CityController {
  private readonly logger = new Logger(CityController.name);

  constructor(private readonly cityService: CityService) {}

  @Post()
  async addCity(
    @Body() createCityDto: CreateCityDto,
    @Res() res: Response
  ): Promise<void> {
    const city = await this.cityService.addCity(createCityDto);
    res.status(HttpStatus.CREATED).json({ city });
  }

  @Get()
  findAllCities(): Promise<any[]> {
    return this.cityService.findAllCities();
  }

  @Get(":id")
  findCityById(@Param("id") id: number): Promise<any> {
    return this.cityService.findCityById(id);
  }

  @Get('/restaurants/')
  findAllCitiesWithRestaurants(): Promise<any[]> {
    return this.cityService.findAllCitiesWithRestaurants();
  }
}
