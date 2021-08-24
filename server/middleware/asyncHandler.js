const asyncHandler = (controllerfunction) => (req, res, next) =>
    Promise.resolve(controllerfunction(req, res, next))
        .catch(next);

module.exports = asyncHandler;
/** we export it to the controllers */