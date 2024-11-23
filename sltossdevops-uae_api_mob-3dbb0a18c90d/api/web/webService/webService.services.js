const connection = require("../../../config/dbconnect");


module.exports = {

    get: (date,callBack) => {
        var sql = '';
        if(date){
            sql = 'SELECT * FROM appointment_details WHERE appoint_stat=0 and appoint_date = ?';
        }else{
            sql = 'SELECT * FROM appointment_details WHERE appoint_stat=0';
        }
        connection.query(
            sql,
            [date],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getAll: (date, category, callBack) => {
        var sql = '';
        var queryArray = [];
        if(date){
            sql = 'SELECT * FROM appointment_details WHERE appoint_date = ?';
            queryArray = [date]
        }else{
            sql = 'SELECT * FROM appointment_details';
        }
        if(category){
            sql += ' AND service_catagory = ?'
            queryArray = [date, category];
        }
        connection.query(
            sql,
            queryArray,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getPending: (date,category,callBack) => {
        var sql = '';
        var queryArray = [];
        if(date){
            sql = 'SELECT * FROM appointment_details WHERE appoint_stat=0 and appoint_date = ?';
            queryArray = [date]
        }else{
            sql = 'SELECT * FROM appointment_details WHERE appoint_stat=0';
        }
        if(category){
            sql += ' AND service_catagory = ?'
            queryArray = [date, category];
        }
        connection.query(
            sql,
            queryArray,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getComplete: (date,category,callBack) => {
        var sql = '';
        var queryArray = [];
        if(date){
            sql = 'SELECT * FROM appointment_details WHERE appoint_stat=1 and appoint_date = ?';
            queryArray = [date]
        }else{
            sql = 'SELECT * FROM appointment_details WHERE appoint_stat=1';
        }
        if(category){
            sql += ' AND service_catagory = ?'
            queryArray = [date, category];
        }
        connection.query(
            sql,
            queryArray,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getCount: (app_date, callBack) => {
        connection.query(
            'SELECT COUNT(*) as appointment_count FROM appointment_details WHERE appointment_details.appoint_date = ?',
            [app_date],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getCountByService: (app_date, callBack) => {
        connection.query(
            'SELECT appointment_details.service_type, COUNT(*) FROM appointment_details WHERE appointment_details.appoint_date = ? GROUP BY appointment_details.service_type',
            [app_date],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getByService: (app_date, service_type, callBack) => {
        connection.query(
            'SELECT * FROM appointment_details WHERE appointment_details.appoint_date = ? AND appointment_details.service_type = ? ',
            [app_date,service_type],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    completeAppoinment : (data, callBack)=>{
        var sqlCompleteAppoinments = "UPDATE appointment_details SET appoint_stat = '1', updated_user = ?, updateDate = sysdate() WHERE appoint_id = ?"
        connection.query(
            sqlCompleteAppoinments,
            [
                data.loginUid,
                data.appointmentId
            ],
            (error, results) => {
                if (error) {
                    return  callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    blockAppoinmentTime : (data, callBack)=>{
        var uid = new Date().getTime();
        var sqlblockAppoinmentTime = "INSERT INTO appointment_block (appoint_bl_uid, appoint_bl_date, appoint_bl_time, service_catagory, appoint_bl_stat, created_user, createDate) VALUES (?,?,?,?,?,?, sysdate())";
        connection.query(
            sqlblockAppoinmentTime,
            [
                uid,
                data.appointBlDate,
                data.appointBlTime,
                data.serviceCatagory,
                data.appointBlStat,
                data.createdUser
            ],
            (error, results) => {
                if (error) {
                    return  callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getBlAppointmentTimeList: (date, catagory, callBack) => {
        var sql = 'SELECT * FROM appointment_block WHERE appoint_bl_stat = 1';
        if(date){
            sql += ' AND appoint_bl_date = ? ';
        }
        if(catagory){
            sql += ' AND service_catagory  = ? ';
        }

        connection.query(
            sql,
            [date, catagory],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    unblockAppoinmentTime : (uid, updatedUser, callBack)=>{
        var sqlunblockAppoinmentTime = "UPDATE appointment_block SET appoint_bl_stat = 0, updated_user = ?, updateDate = sysdate() WHERE appoint_bl_uid = ?";
        connection.query(
            sqlunblockAppoinmentTime,
            [updatedUser, uid ],
            (error, results) => {
                if (error) {
                    return  callBack(error);
                }
                console.log(results)
                console.log('results')
                return callBack(null, results);
            }
        );
    },



};