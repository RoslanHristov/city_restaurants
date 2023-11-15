import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

enum FoodEnum {
  PIZZA = "pizza",
  BURGER = "burger",
  PASTA = "pasta",
}

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(FoodEnum)
  food: FoodEnum;

  @IsString()
  cityId: string;
}
