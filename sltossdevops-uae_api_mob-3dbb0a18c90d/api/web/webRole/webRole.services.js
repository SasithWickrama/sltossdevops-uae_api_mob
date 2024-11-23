const connection = require("../../../config/dbconnect");


module.exports = {

    create : (data, callBack)=>{
        var uid = new Date().getTime();
        var sqlcreaterole = "insert into web_user_role(uid, roleName, roleDescription, createDate) values (?,?,?,sysdate())";
        connection.query(
            sqlcreaterole,
            [
                uid,
                data.roleName,
                data.roleDescription,
            ],
            (error, results) => {
                if (error) {
                    return  callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    get: (roleId, callBack) => {
        connection.query(
            `select * from web_user_role where uid = ?`,
            [roleId],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                console.log(results);
                return callBack(null, results);
            }
        );
    },

    getAll: callBack => {
        var sqlgetallrole =  "select * from web_user_role";
        connection.query(
            sqlgetallrole,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getRoleById: (uid, callBack) => {
        const sqlGetUser = "SELECT * FROM web_user_role WHERE web_user_role.uid = ? ";
        connection.query(
            sqlGetUser,
            [uid],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    update: (data, callBack) => {
        console.log(data);
        const sqlUpdateUser = "UPDATE web_user_role SET roleName = ? , roleDescription = ?, updateDate = sysdate() WHERE uid = ? ";
        connection.query(
            sqlUpdateUser,
            [
                data.roleName,
                data.roleDescription,
                data.uid
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    delete: (uid, callBack) => {
        const sqlDeleteUser = "DELETE FROM web_user_role WHERE web_user_role.uid = ?";
        connection.query(
            sqlDeleteUser, 
            [uid], 
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
};