const express=require("express");

const routes=express.Router();

const reportController = require('../report/controller');

// POST /api/reports
routes.post('/', reportController.create);

// GET /api/reports
routes.get('/', reportController.getReports);

module.exports = routes;