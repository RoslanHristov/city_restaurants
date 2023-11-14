import { RestaurantEntity } from './restaurant.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  restaurants: RestaurantEntity;

  @CreateDateColumn()
  createdAt: Date;
}