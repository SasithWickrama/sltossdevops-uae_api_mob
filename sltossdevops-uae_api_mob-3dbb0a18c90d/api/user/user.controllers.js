const service = require("./user.services");
const { hashSync, genSaltSync,compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

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

    login: (req, res) => {
        const body = req.body;
        service.getUser(body.passportNo, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }
            if (!results) {
                return res.status(400).json({
                    result: 0,
                    message:"Invalid Passport Number",
                });
            }
            const result = compareSync(body.passCode, results.passCode);
            if (result) {
                results.passCode = undefined;
                const jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "12h"
                });
                return res.status(200).json({
                    result: 1,
                    message: "login successfully",
                    token: jsontoken,
                    data: results
                });
            } else {
                return res.json({
                    result: 0,
                    message:"Invalid Password",
                });
            }
        });
    },

    changePasswd: (req, res) => {
        const body = req.body;

        const salt = genSaltSync(10);
        body.passCode = hashSync(body.passCode, salt);
        console.log(body);
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
            }else{
                return res.status(400).json({
                    result: 0,
                    message:"failed",
                });
            }

        });
    },



}