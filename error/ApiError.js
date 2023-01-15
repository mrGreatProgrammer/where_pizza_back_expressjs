class ApiError extends Error{
  constructor(status, message) {
      super();
      this.status = status
      this.message = message
  }

  static badRequest(message, res) {
      // return new ApiError(404, message, res)
      return res.status(404).json({message})
  }

  static internal(message, res) {
      // return new ApiError(500, message, res)
      return res.status(500).json({message})
  }

  static forbidden(message, res) {
      // return new ApiError(403, message, res)
      return res.status(403).json({message})
  }
}

module.exports = ApiError