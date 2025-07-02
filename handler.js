exports.successResponse = (res, data, message = "Operation successful") => {
  return res.status(200).json({
    status: 'success',
    message,
    data
  });
};

exports.createdResponse = (res, data, message = "Resource created successfully") => {
  return res.status(201).json({
    status: 'success',
    message,
    data
  });
};

exports.errorResponse = (res, error, statusCode = 400) => {
  console.error('Error:', error); // Optional log
  return res.status(statusCode).json({
    status: 'error',
    message: error.message || 'An error occurred'
  });
};