const connection = require("../../../config/dbconnect");


module.exports = {

    getAll: callBack => {
        connection.query(
            `SELECT * FROM web_role_task`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getTaskById: (uid, callBack) => {
        const sqlGetUser = "SELECT * FROM web_role_task WHERE web_role_task.task_id = ?";
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

    createTask: (data, callBack) => {
        var task_id = new Date().getTime();
        var sqlCreateTask = "INSERT INTO web_role_task (task_id, task_name, createdDate) VALUES (?,?, sysdate())";
        connection.query(
            sqlCreateTask,
            [
                task_id,
                data.task_name
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    assignTaskToRole: (data, callBack) => {

        const tasks = data.tasks; // Array of tasks to insert
        const roleId = data.role_id;

        const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format as 'YYYY-MM-DD HH:MM:SS'
        // Create an array of value tuples for the query
        const values = tasks.map(task => [roleId, task.task_id, currentTimestamp]);

        const sqlAssignTask = "INSERT IGNORE INTO web_user_role_task (role_id, task_id, createdDate) VALUES ?";
        connection.query(
            sqlAssignTask,
            [values],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    removeTaskFromRole: (data, callBack) => {

        const tasks = data.tasks; // Array of tasks to insert
        const roleId = data.role_id;

        // Create an array of value tuples for the query
        const values = tasks.map(task => [roleId, task.task_id]);
        
        // Create an array of placeholders
        const placeholders = values.map(() => '(?, ?)').join(', ');
    
        // Flatten the pairs into a single array of values
        const valuesflat = values.flat();

        const sqlAssignTask = `DELETE FROM web_user_role_task WHERE (role_id, task_id) IN (${placeholders})`;
        connection.query(
            sqlAssignTask,
            valuesflat,
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getTaskFromRole: (role_id, callBack) => {

        const sqlGetTask = "SELECT task_id FROM web_user_role_task WHERE role_id = ?";
        connection.query(
            sqlGetTask,
            [role_id],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    update: (data, callBack) => {
        const sqlUpdateUser = "UPDATE web_role_task SET task_name = ? , updateDate = sysdate() WHERE task_id = ? ";
        connection.query(
            sqlUpdateUser,
            [
                data.task_name,
                data.task_id
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    delete: (uid, callBack) => {
        const sqlDeleteUser = "DELETE FROM web_role_task WHERE web_role_task.task_id = ?";
        connection.query(
            sqlDeleteUser, 
            [uid], 
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
};