import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Profile } from "./Profile"
import { BigIntTransformer } from "../transformer/BigIntTransformer"
import { isBooleanObject } from "util/types"

@Entity()
export class Hobby {
  @Generated("increment")
  @PrimaryColumn({
    type: "bigint",
    transformer: new BigIntTransformer(), // If you disable this line, it will work fine.
  })
  id: number

  @Column()
  name: string

  @ManyToOne(() => Profile, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: "profile_id", referencedColumnName: "id" })
  profile: Profile

  constructor(profile: Profile) {
    this.profile = profile
  }

  changeHobbyName(name: string) {
    this.name = name
  }
}
