import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { City } from "./city.entity";

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => City, (city) => city.restaurants)
  city: City;

  @Column()
  cityId: string;

  @Column({ nullable: true })
  food: string;

  @CreateDateColumn()
  createdAt: Date;
}
