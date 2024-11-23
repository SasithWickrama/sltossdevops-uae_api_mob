const service = require("./webTask.services");

module.exports = {

    getAllTasks: (req, res) => {
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

    getTaskById: (req, res) => {
        const uid = req.query.uid;
        service.getTaskById(uid, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }
            if(!uid){
                return res.status(400).json({
                    result: 0,
                    message:'Task ID is not provided',
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

    createTask: (req, res) => {
        const body = req.body;
        service.createTask(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    result: 0,
                    message: err.message,
                });
            }
            console.log(results);
            if (results.affectedRows == 1) {
                return res.status(200).json({
                    result: 1,
                    message: "success",
                });
            }
        });
    },

    assignTaskToRole: (req, res) => {
        const body = req.body;
        console.log(body)
        service.assignTaskToRole(body, (err, results) => {
            if (err) {
                console.log('err');
                console.log(err.code);
                console.log('/err');
                if(err.code = 'ER_DUP_ENTRY'){
                    return res.status(200).json({
                        result: 0,
                        message: err.code,
                    });
                }else{
                    return res.status(400).json({
                        result: 0,
                        message: err.message,
                    });
                }
            }
            console.log(results);
            if (results.affectedRows > 0) {
                return res.status(200).json({
                    result: 1,
                    message: "Task assigned to role successfully",
                });
            }else{
                return res.status(200).json({
                    result: 1,
                    message: "ALREADY_EXITS",
                });
            }
        });
    },

    removeTaskFromRole: (req, res) => {
        const body = req.body;
        console.log(body)
        service.removeTaskFromRole(body, (err, results) => {
            if (err) {
                console.log('err');
                console.log(err.code);
                console.log('/err');
                return res.status(400).json({
                    result: 0,
                    message: err.message,
                });
            }
            console.log(results);
            if (results.affectedRows > 0) {
                return res.status(200).json({
                    result: 1,
                    message: "Task removed to role successfully",
                });
            }else{
                return res.status(200).json({
                    result: 1,
                    message: "ALREADY_DELETED",
                });
            }
        });
    },

    getTaskFromRole: (req, res) => {
        const role_id = req.query.role_id;
        service.getTaskFromRole(role_id, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }
            if(!role_id){
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
}