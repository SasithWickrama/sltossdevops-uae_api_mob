const service = require("./webUser.services");
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
                return res.set('Access-Control-Allow-Origin', 'http://localhost:4200').status(200).json({
                    result: 1,
                    message:"success",

                });
            }

        });
    },

    getUser: (req, res) => {
        const userId = req.params.id;
        service.get(userId, (err, results) => {
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

    getUsers: (req, res) => {
        service.getAll((err, results) => {
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

    changePasswd: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.passCode = hashSync(body.passCode, salt);
        service.passwdChange(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }
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

    login: (req, res) => {
        const body = req.body;
        service.get(body.userId, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }
            if (!results) {
                return res.status(400).json({
                    result: 0,
                    message:"Invalid Username",
                });
            }
            console.log(body.passCode)
            console.log(results.passCode)
            const result = compareSync(body.passCode, results.passCode);
            console.log(result)

            if (result) {
                results.passCode = undefined;
                const jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "12h"
                });
                return res.set('Access-Control-Allow-Origin', 'http://localhost:4200').status(200).json({
                    result: 1,
                    message: "login successfully",
                    token: jsontoken,
                    data: results
                });
            } else {
                return res.status(401).json({
                    result: 0,
                    message:"Invalid Password",
                });
            }
        });
    },

    signout: (req, res) => {

        req.session = null;
        console.log(req)
        return res.set('Access-Control-Allow-Origin', 'http://localhost:4200').status(200).json({
            result: 1,
            message: "You've been signed out!",
        });
    },
}