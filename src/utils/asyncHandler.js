const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" ,
    success: false,
    });
    next(error);
  }
};

export { asyncHandler };
