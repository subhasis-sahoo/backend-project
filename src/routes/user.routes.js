import { Router } from "express";
import { 
    changeCurrentPassword, 
    currentUser, 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    updateUserAvatar, 
    updateAccountDetails, 
    updateUserCoverImage, 
    getUserChannelProfile, 
    getWatchHistory 
} from "../controllers/user.controllers.js"
import { upload } from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)


// secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, currentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails) // here we use patch as we only update some of user data not all data

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)

router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/c/:username").get(verifyJWT, getUserChannelProfile) // As we get data from url (params)

router.route("/history").get(verifyJWT, getWatchHistory)

export default router