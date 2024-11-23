const service = require("./webService.services");
const { hashSync, genSaltSync,compareSync } = require("bcrypt");

module.exports = {

    getAppointments: (req, res) => {
        const date = req.query.date;
        service.get(date, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }

            return res.status(200).json({
                result: 1,
                count: results.length,
                message: "success",
                data: results
            });

        });
    },

    getAppointmentsAll: (req, res) => {
        const date = req.query.date;
        const category = req.query.category;
        service.getAll(date, category, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }

            return res.status(200).json({
                result: 1,
                count: results.length,
                message: "success",
                data: results
            });

        });
    },

    getAppointmentsPending: (req, res) => {
        const date = req.query.date;
        const category = req.query.category;
        service.getPending(date, category, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }

            return res.status(200).json({
                result: 1,
                count: results.length,
                message: "success",
                data: results
            });

        });
    },

    getAppointmentsComplete: (req, res) => {
        const date = req.query.date;
        const category = req.query.category;
        service.getComplete(date, category, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }

            return res.status(200).json({
                result: 1,
                count: results.length,
                message: "success",
                data: results
            });

        });
    },

    getAppointmentCount: (req, res) => {
        const date = req.query.date;
        const date1 = req.params;
        console.log(date)
        console.log(date1)
        console.log(req)
        console.log(req.query)
        service.getCount(date, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }

            return res.status(200).json({
                result: 1,
                count: results.length,
                message: "success",
                data: results
            });

        });
    },

    getAppointmentCountByService: (req, res) => {
        const date = req.body.date;
        service.getCountByService(date, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }

            return res.status(200).json({
                result: 1,
                count: results.length,
                message: "success",
                data: results
            });

        });
    },

    getAppointmentByService: (req, res) => {
        const date = req.body.date;
        const service_type = req.body.service_type;
        service.getByService(date,service_type, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }

            return res.status(200).json({
                result: 1,
                count: results.length,
                message: "success",
                data: results
            });

        });
    },

    updateCompleteAppoinment : (req, res)=> {
        const body = req.body;
        service.completeAppoinment(body, (err ,results) => {
            if( err){
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }

            console.log(results);
            if(results.affectedRows == 1){
                return res.status(200).json({
                    result: 1,
                    message:"success",
                });
            }else{
                return res.status(400).json({
                    result: 0,
                    message:"failed",
                });
            }

            });
    },

    createBlockAppoinmentTime : (req, res)=> {
        const body = req.body;
        service.blockAppoinmentTime(body, (err ,results) => {
            if( err){
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }

            console.log(results);
            if(results.affectedRows == 1){
                return res.status(200).json({
                    result: 1,
                    message:"success",
                });
            }else{
                return res.status(400).json({
                    result: 0,
                    message:"failed",
                });
            }

            });
    },

    getBlockAppoinmentTime : (req, res)=> {
        // console.log(req.body)
        const date = req.body.appointBlStat;
        const catagory = req.body.serviceCatagory;
        service.getBlAppointmentTimeList(date, catagory, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }

            return res.status(200).json({
                result: 1,
                count: results.length,
                message: "success",
                data: results
            });

        });

    },

    UnblockAppoinmentTime : (req, res)=> {
        const uid = req.body.uid;
        const updatedUser = req.body.updatedUser;
        console.log(req.body);
        console.log(req.body);
        service.unblockAppoinmentTime(uid, updatedUser, (err ,results) => {
            if( err){
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }
            console.log('hhhh')
            console.log(results)
            console.log(results.affectedRows)

            if(results.affectedRows == 1){
                return res.status(200).json({
                    result: 1,
                    message:"success",
                });
            }else{
                return res.status(400).json({
                    result: 0,
                    message:"failed",
                });
            }

            });
    },

   
}