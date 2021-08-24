const asyncHandler = (controllerfunction) => (req, res, next) =>
    Promise.resolve(controllerfunction(req, res, next))
        .catch(next);

module.exports = asyncHandler;
/** we export it to the controllers
 * For errors returned from asynchronous functions invoked by route handlers and middleware, you must pass them to the
 * next() function, where Express will catch and process them.
*/