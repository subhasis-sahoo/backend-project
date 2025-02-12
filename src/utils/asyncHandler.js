// Better approach
const asyncHandler = (requesthandler) => {
    return (req, res, next) => {
        return Promise.resolve(requesthandler(req, res, next)).catch((err) => next(err))
    }
}

export { asyncHandler }

// const asynchandler = () => {}
// const asynchandler = (func) => () => {}
// const asynchandler = (func) => async() => {}


// Alternate approach

// const asynchandler = (fn) => async(req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }