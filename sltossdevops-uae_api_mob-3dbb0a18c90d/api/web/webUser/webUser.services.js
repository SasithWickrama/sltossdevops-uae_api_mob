const connection = require("../../../config/dbconnect");


module.exports = {
    create : (data, callBack)=>{
        var uid = new Date().getTime();
        var sqlcreateuser = "insert into web_user_auth(uid, userName, firstName, lastName, nic, passCode,  roleId, status, createDate) values (?,?,?,?,?,?,?,?,sysdate())";
        connection.query(
            sqlcreateuser,
            [
                uid,
                data.userName,
                data.firstName,
                data.lastName,
                data.nic,
                data.passCode,
                data.roleId,
                data.status

            ],
            (error, results) => {
                if (error) {
                    return  callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    
    get: (userId, callBack) => {
        // var sqlget = "SELECT a.*, r.roleName FROM web_user_auth a JOIN web_user_role r ON a.roleId = r.uid WHERE a.userName = ?";
        // var sqlget = "SELECT wua.*, wur.roleName, GROUP_CONCAT(DISTINCT t.task_name SEPARATOR ', ') AS task FROM web_user_auth wua JOIN web_user_role wur ON wua.roleId = wur.uid JOIN web_user_role_task urt ON wua.roleId = urt.role_id JOIN web_role_task t ON urt.task_id = t.task_id WHERE wua.userName = ?";
        var sqlget = " SELECT wua.uid, wua.userName, wua.firstName, wua.lastName, wua.nic, wua.passCode, wua.roleId, wua.createDate, wua.updateDate, wur.roleName, GROUP_CONCAT(DISTINCT t.task_name SEPARATOR ', ') AS task  FROM web_user_auth wua  JOIN web_user_role wur ON wua.roleId = wur.uid  JOIN web_user_role_task urt ON wua.roleId = urt.role_id  JOIN web_role_task t ON urt.task_id = t.task_id  WHERE wua.userName = ? GROUP BY wua.uid, wua.userName, wua.firstName, wua.lastName, wua.nic, wua.passCode, wua.roleId, wua.createDate, wua.updateDate, wur.roleName";

       
        connection.query(
            sqlget,
            [userId],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    getUserById: (uid, callBack) => {
        const sqlGetUser = "SELECT * FROM web_user_auth WHERE uid = ?";
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

    getAll: callBack => {
        connection.query(
            `select web_user_auth.*, web_user_role.roleName from web_user_auth JOIN web_user_role ON web_user_auth.roleId = web_user_role.uid;`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    passwdChange : (data, callBack)=>{
        var sqlchanpass = "update web_user_auth set passCode = ?, updateDate = sysdate() where uid = ?"
        connection.query(
            sqlchanpass,
            [
                data.passCode,
                data.uid
            ],
            (error, results) => {
                if (error) {
                    return  callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    update: (data, callBack) => {
        const sqlUpdateUser = "UPDATE web_user_auth SET userName = ?, firstName = ?, lastName = ?, nic = ?, roleId = ?, status = ?, updateDate = sysdate() WHERE uid = ?";
        connection.query(
            sqlUpdateUser,
            [
                data.userName,
                data.firstName,
                data.lastName,
                data.nic,
                data.roleId,
                data.status,
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

    delete: (userId, callBack) => {
        const sqlDeleteUser = "DELETE FROM web_user_auth WHERE uid = ?";
        connection.query(
            sqlDeleteUser, 
            [userId], 
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
};