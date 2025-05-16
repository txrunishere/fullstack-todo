import asyncHandler from 'express-async-handler';

const handleHealthCheck = asyncHandler(async (req, res) => {
  return res.status(200)
  .json(
    {
      message: "OK Report"
    }
  )
})

export {
  handleHealthCheck
}