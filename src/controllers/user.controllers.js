import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResonse.js"

const registerUser = asyncHandler( async(req, res) => {
    // Steps to register a user :-
    // get user details from frontend
    // validation
    // check if user already exists using email and username
    // check for images and check for avatar
    // upload them on cloudinary, check avatar
    // create user object - create entry in db 
    // remove password and refresh token field from response
    // check for the user creation
    // return response

    // get user details from frontend
    const {username, email, fullname, password} = req.body
    console.log("email: ", email)

    // validation
    if(
        [username, email, fullname, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // check if user already exists using email and username
    const exitstedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    // console.log(exitstedUser)

    if(exitstedUser) {
        throw new ApiError(409, "User with username or email already exists.")
    }

    // check for images and check for avatar
    // As we create coverImage field not required while user registration so if a user don't give cover iamge then our application works perporly but the below line create error if coverImage not provided, so we have to manage it in our traditional if-else way.
    // const avatarLocalPath = req.files?.avatar[0]?.path
    // const coverImageLocalPath = req.files?.coverImage[0]?.path

    let avatarLocalPath;
    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path
    }
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    // console.log(req.files)

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar files is required")
    }

    // upload them on cloudinary, check avatar
    // Here we can do one more thing if coverImageLocalpath is not null then only we upload it to cloudinary else not.
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiError(400, "Avatar files is required")
    }

    // create user object - create entry in db 
    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

export { registerUser }