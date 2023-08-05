import "reflect-metadata"
import { DataSource } from "typeorm"
import { Profile } from "./entity/Profile"
import { Hobby } from "./entity/Hobby"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5434,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: true,
  entities: [Profile, Hobby],
  subscribers: [],
  migrations: [],
})
