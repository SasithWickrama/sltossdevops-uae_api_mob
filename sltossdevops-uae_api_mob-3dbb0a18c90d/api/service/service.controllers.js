const service = require("./service.services");

module.exports = {

    getService: (req, res) => {
        const body = req.body;
        service.getServiceDetails(body.embassyName, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }

            console.log(results);
            return res.status(200).json({
                result: 1,
                message: "success",
                data: results
            });

        });
    },

    updateAppoint : (req, res)=> {
        const body = req.body;
        service.updateAppointment(body, (err ,results) => {
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

    getBooked: (req, res) => {
        const body = req.body;
        service.getBookedDetails(body.bdate, (err, results) => {
            if (err) {
                return res.status(400).json({
                    result: 0,
                    message:err.message,
                });
            }

            console.log(results);
            return res.status(200).json({
                result: 1,
                message: "success",
                data: results
            });

        });
    },


}