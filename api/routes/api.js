var router = require('express').Router();
var spreadsheet_controller = require('../controllers/spreadsheet');

var APIRoutes = function() {

    router.get('/upload-student-ss', spreadsheet_controller.upload_student_ss);

    return router;
};

module.exports = APIRoutes;