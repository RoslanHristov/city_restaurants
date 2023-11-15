import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Restaurant } from "./restaurant.entity";

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number; // Using numbers instead of UUID for simplicity

  @Column()
  name: string;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.city)
  restaurants: Restaurant[];

  @CreateDateColumn()
  createdAt: Date;
}