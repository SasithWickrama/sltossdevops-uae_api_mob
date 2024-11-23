const connection = require("../../config/dbconnect");


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

    passwdChange : (data, callBack)=>{
        connection.query(
            `update  user_details set passCode= ?, updateDate = sysdate()  where passportNo = ?`,
            [
                data.passCode,
                data.passportNo
            ],
            (error, results) => {
                if (error) {
                    return  callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUsers: callBack => {
        connection.query(
            `select firstName,lastName,gender,email,number from registration`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
};