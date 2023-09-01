const userReposity = require('../repository/users')

class UserController {

    async getAllusers() {
       return await userReposity.getAllusers()
    }
    async createUsers(users) {
        return await userReposity.createUsers(users)
     }
    async updateUsers(users) {
        return await userReposity.updateUsers(users)
     }
    async deleteUsers(id) {
        return await userReposity.deleteUsers(id)
     }
}

module.exports = new UserController