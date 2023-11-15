import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { City } from './city.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => City, city => city.restaurants)
  city: City;

  @Column()
  cityId: number;

  @CreateDateColumn()
  createdAt: Date;
}