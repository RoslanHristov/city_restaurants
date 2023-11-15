import { IsNumber, IsString } from "class-validator";

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsNumber()
  cityId: number;
}
