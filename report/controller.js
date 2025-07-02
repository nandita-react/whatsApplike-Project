const handler = require('../handler');
const Repository = require('./repository');

exports.create = async (req, res) => {
  const reportRepo = new Repository(req);
  try {
    const report = await reportRepo.create();
    return handler.createdResponse(res, report, "Report submitted successfully.");
  } catch (err) {
    return handler.errorResponse(err);
  }
};

exports.getReports = async (req, res) => {
  const reportRepo = new Repository(req);
  try {
    const reports = await reportRepo.getAll();
    return handler.successResponse(res, reports, "Reports fetched.");
  } catch (err) {
    return handler.errorResponse(err);
  }
};