import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Logger,
  Param,
  Delete,
  Put
} from "@nestjs/common";
import { CityService } from "./city.service";
import { CreateCityDto } from "./city.dto";
import { HttpStatus } from "@nestjs/common/enums";
import { Response } from "express";
import { City } from "src/libs/entities/city.entity";

@Controller("city")
export class CityController {
  private readonly logger = new Logger(CityController.name);

  constructor(private readonly cityService: CityService) {}
  @Get("/all-city-restaurants")
  findAllCitiesWithRestaurants(): Promise<any[]> {
    return this.cityService.findAllCitiesWithRestaurants();
  }

  @Post()
  async addCity(
    @Body() createCityDto: CreateCityDto,
    @Res() res: Response
  ): Promise<City> {
    const city = await this.cityService.addCity(createCityDto);
    return res.status(HttpStatus.CREATED).json({ city });
  }

  @Get()
  async findAllCities(@Res() res: Response): Promise<City[]> {
    const cities = await this.cityService.findAllCities();
    return res.status(HttpStatus.OK).json({ cities });
  }

  @Get(":id")
  findCityById(@Param("id") id: string): Promise<City> {
    return this.cityService.findCityById(id);
  }

  @Delete(":id")
  async deleteCityById(@Param("id") id: string, @Res() res: Response): Promise<void> {
    const deletedCity = await this.cityService.deleteCityById(id);
    return res.status(HttpStatus.OK).json({ deletedCity });
  }

  @Put(":id")
  async updateCityById(
    @Param("id") id: string,
    @Body() createCityDto: CreateCityDto,
    @Res() res: Response
  ): Promise<void> {
    const updatedCity = await this.cityService.updateCityById(id, createCityDto);
    return res.status(HttpStatus.OK).json({ updatedCity });
  }
}
