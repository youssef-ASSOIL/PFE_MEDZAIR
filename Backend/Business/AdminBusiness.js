const AdminDao = require("../dao/AdminDao");

class AdminBusiness{
    static CheckLogin(codeAdmin, password){
        return AdminDao.AdminLogin(codeAdmin, password);
    }

}

module.exports = AdminBusiness;