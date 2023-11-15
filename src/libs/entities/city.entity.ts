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
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.city)
  restaurants: Restaurant[];

  @CreateDateColumn()
  createdAt: Date;
}
