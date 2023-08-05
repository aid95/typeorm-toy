import { Profile } from "./entity/Profile"
import { Hobby } from "./entity/Hobby"
import { AppDataSource } from "./data-source"

AppDataSource.initialize()
  .then(async () => {
    // stage 1
    const profile = new Profile("imdudu1")
    await AppDataSource.manager.save(profile)

    const hobby1 = new Hobby(profile)
    hobby1.name = "Programming"
    await AppDataSource.manager.save(hobby1)

    const hobby2 = new Hobby(profile)
    hobby2.name = "TypeScript"
    await AppDataSource.manager.save(hobby2)

    // stage 2
    const findProfile = await AppDataSource.manager
      .createQueryBuilder(Profile, "profile")
      .where("profile.name = :name", { name: "imdudu1" })
      .innerJoinAndSelect("profile.hobbies", "hobby")
      .getOne()

    // stage 3
    findProfile.updateHobbies()

    // stage 4
    await AppDataSource.manager.save(findProfile)
  })
  .catch((error) => console.log("Error: ", error))
