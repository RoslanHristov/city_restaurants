import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { CityEntity } from './city.entity';

@Entity()
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => CityEntity, city => city.restaurants)
  city: CityEntity;
  
  @CreateDateColumn()
  createdAt: Date;
}