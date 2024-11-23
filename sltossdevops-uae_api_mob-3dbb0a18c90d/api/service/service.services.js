const connection = require("../../config/dbconnect");


module.exports = {

    getServiceDetails: (embassyName, callBack) => {
        connection.query(
            `select * from service_details where embassy_name = ?`,
            [embassyName],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    updateAppointment : (data, callBack)=>{
        var uid = new Date().getTime();
        var sqlcreateuser = "insert into appointment_details(appoint_id,appoint_date,appoint_time,service_type,appoint_user,appoint_stat,appoint_count,createDate) values(?,?,?,?,?,?,?,sysdate())";
        connection.query(
            sqlcreateuser,
            [
                data.appointId,
                data.appointDate,
                data.appointTime,
                data.service,
                data.appointuser,
                data.appointStat,
                data.appointCount
            ],
            (error, results) => {
                if (error) {
                    return  callBack(error);
                }
                return callBack(null, results);
            }
        );

    },

    getBookedDetails: (bdate, callBack) => {
        connection.query(
            `select appoint_time from appointment_details where appoint_date = ?`,
            [bdate],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },



};