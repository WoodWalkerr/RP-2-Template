const { connect } = require("../config/db");
const bcrypt = require('bcryptjs');


class UserReposity {
  db = {};
  constructor() {
    this.db = connect();
  }

  async getAllusers() {
    try {
      const user = await this.db.users.findAll(
        {
        order: [["id", "ASC"]],
        }
      );
      return user;
    } catch (error) {
      console.log("Error", error);
    }
  }

  async createUsers(users) {
    let userData = {}

    try {
      const password = users.password
      const salt = bcrypt.genSaltSync(5);
      const hash = bcrypt.hashSync(password, salt);

      userData = {...users, password: hash}
      const createUser = await this.db.users.create(userData)
      return createUser;
    } catch (error) {
      console.log('Error', error)
    }
  }

  async updateUsers(users) {
    let data = {}
    try {
      data = await this.db.users.update(
        {...users},
        {
          where: {
            id : users.id
          }
        }
      )
    } catch (error) {
      console.log('Error', error)
    }
  }
  async deleteUsers(id) {
    try {
      const deleteUser = await this.db.users.destroy(
        {
          where: { id }
        }
      )
    } catch (error) {
      console.log('Error', error)
    }
  }

}
module.exports = new UserReposity();
