const service = require("./webRole.services");
const { hashSync, genSaltSync,compareSync } = require("bcrypt");

module.exports = {

    createRole: (req, res) => {
        const body = req.body;
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

    getRole: (req, res) => {
        const roleId = req.params.id;
        service.get(roleId, (err, results) => {
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

    getRoles: (req, res) => {
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

    getRoleById: (req, res) => {
        const uid = req.query.uid;
        service.getRoleById(uid, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }
            if(!uid){
                return res.status(400).json({
                    result: 0,
                    message:'Role ID is not provided',
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

    updateRole: (req, res) => {
        const body = req.body;
        service.update(body, (err, results) => {
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
            }
        });
    },

    deleteRole: (req, res) => {
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
                    message:'Role ID is not provided',
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

   
}