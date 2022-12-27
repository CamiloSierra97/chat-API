//? Dependencies
const uuid = require("uuid");
const { faker } = require("@faker-js/faker");
const { hashPassword } = require("../../utils/crypto");

const Users = require("../../models/users.models");

const createUsers = () => {
  for (let i = 0; i < 10; i++) {
    Users.create({
      id: uuid.v4(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: hashPassword("root"),
      phone: faker.phone.number(),
      birthday: faker.date.birthdate(),
    });
  }

  Users.create({
    id: "39bbcef5-bff2-4ea2-b0af-6a3b2c08fec9",
    firstName: "Admin",
    lastName: "Root",
    email: "admin@admin.com",
    password: hashPassword("root"),
    role: "admin",
    phone: "12341234",
    birthday: "2000/10/22",
  });
};

module.exports = createUsers;
