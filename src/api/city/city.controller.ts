import { Controller, Get, Post, Body, Res } from "@nestjs/common";
import { CityService } from "./city.service";
import { CreateCityDto } from "./city.dto";
import { HttpStatus } from "@nestjs/common/enums";
import { Response } from "express";

@Controller("cities")
export class CityController {
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
  findAll(): Promise<any[]> {
    return this.cityService.findAll();
  }
}
