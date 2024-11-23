const service = require("./user.services");
const { hashSync, genSaltSync,compareSync } = require("bcrypt");

module.exports = {

    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.passCode = hashSync(body.passCode, salt);
        service.create(body, (err, results) => {
            if (err) {
                console.log(err);
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
            }

        });
    },

    getAll: (req, res) => {
        service.getUsers( (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }
            return res.status(200).json({
                result: 1,
                message: "success",
                data: results
            });
        });
    },

    get: (req, res) => {
        const passportNo = req.query.passportNo;
        service.getUser(passportNo, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }
            if(!passportNo){
                return res.status(400).json({
                    result: 0,
                    message:'Passport Number is not provided',
                });
            }else{
                return res.status(200).json({
                    result: 1,
                    message: "success",
                    data: results
                });
            }
            

        });
    },

    getUserById: (req, res) => {
        const uid = req.query.uid;
        service.getUserById(uid, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }
            if(!uid){
                return res.status(400).json({
                    result: 0,
                    message:'user ID is not provided',
                });
            }else{
                return res.status(200).json({
                    result: 1,
                    message: "success",
                    data: results
                });
            }
            

        });
    },

    updateUser: (req, res) => {
        const body = req.body;
        service.update(body, (err, results) => {
            if (err) {
                console.log(err);
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
            }
        });
    },

    deleteUser: (req, res) => {
        const body = req.body;
        const uid = body.uid;
        service.delete(uid, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }
            if(!uid){
                return res.status(400).json({
                    result: 0,
                    message:'user ID is not provided',
                });
            }else{
                return res.status(200).json({
                    result: 1,
                    message: "success",
                    data: results
                });
            }
            

        });
    },

    passwdChangeUser: (req, res) => {
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.passCode = hashSync(body.passCode, salt);
        service.passwdChange(body, (err, results) => {
            if (err) {
                console.log(err);
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
            }
        });
    },

}