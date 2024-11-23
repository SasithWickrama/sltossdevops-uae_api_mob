const connection = require("../../../config/dbconnect");


module.exports = {

    create : (data, callBack)=>{
        var uid = new Date().getTime();
        var sqlcreateuser = "insert into user_details(uid,fullName, firstName, lastName, nic, gender, dateOfBirth,age,slAddress ,emergencyContact,passportNo ,uaeAddress,uaeMobileNo ,empAddress,empContact ,salary ,slContactName ,slContactNo ,uaeContactName,uaeContactNo,passCode,createDate) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,sysdate())";
        connection.query(
            sqlcreateuser,
            [
                uid,
                data.fullName,
                data.firstName,
                data.lastName,
                data.nic,
                data.gender,
                data.dateOfBirth,
                data.age,
                data.slAddress ,
                data.emergencyContact,
                data.passportNo ,
                data.uaeAddress,
                data.uaeMobileNo ,
                data.empAddress,
                data.empContact ,
                data.salary ,
                data.slContactName ,
                data.slContactNo,
                data.uaeContactName,
                data.uaeContactNo,
                data.passCode

            ],
            (error, results) => {
                if (error) {
                    return  callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUser: (passportNo, callBack) => {
        connection.query(
            `select * from user_details where passportNo = ?`,
            [passportNo],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    getUsers: callBack => {
        const sqlGetAllUser = "SELECT * FROM user_details";
        connection.query(
            // `select firstName,lastName,gender,email,number from registration`,
            sqlGetAllUser,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserById: (uid, callBack) => {
        const sqlGetUser = "SELECT * FROM user_details WHERE uid = ?";
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

    update: (user, callBack) => {
        const { firstName, lastName, fullName, nic, gender, dateOfBirth, age, passportNo, emergencyContact, uaeAddress, uaeMobileNo, uaeContactName, uaeContactNo, slAddress, slContactName, slContactNo, empAddress, empContact, salary, passCode, uid } = user;
        connection.query(
            `UPDATE user_details SET firstName = ?, lastName = ?, fullName = ?, nic = ?, gender = ?, dateOfBirth = ?, age = ?, passportNo = ?, emergencyContact = ?, uaeAddress = ?, uaeMobileNo = ?, uaeContactName = ?, uaeContactNo = ?, slAddress = ?, slContactName = ?, slContactNo = ?, empAddress = ?, empContact = ?, 
             salary = ?, passCode = ?, updateDate = sysdate() WHERE uid = ?`,
            [firstName, lastName, fullName, nic, gender, dateOfBirth, age, passportNo, emergencyContact, uaeAddress, uaeMobileNo, uaeContactName, uaeContactNo, slAddress, slContactName, slContactNo, empAddress, empContact, salary, passCode, uid],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    delete: (uid, callBack) => {
        const sqlDeleteUser = "DELETE FROM user_details WHERE uid = ?";
        connection.query(sqlDeleteUser, [uid], (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },

    passwdChange: (data, callBack) => {
        var sqlchanpass = "update user_details set passCode = ?, updateDate = sysdate() where uid = ?"
        connection.query(
            sqlchanpass,
            [
                data.passCode,
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
};