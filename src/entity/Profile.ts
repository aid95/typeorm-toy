import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Hobby } from "./Hobby"
import { BigIntTransformer } from "../transformer/BigIntTransformer"

@Entity()
export class Profile {
  @Generated("increment")
  @PrimaryColumn({
    type: "bigint",
    transformer: new BigIntTransformer(), // If you disable this line, it will work fine.
  })
  id: number

  @Column()
  name: string

  @OneToMany(() => Hobby, (hobby) => hobby.profile, {
    cascade: ["insert", "update"],
  })
  hobbies: Hobby[]

  constructor(name: string) {
    this.name = name
  }

  updateHobbies() {
    this.name = "updated"
    this.hobbies.forEach((hobby) => hobby.changeHobbyName("updated"))
  }
}
