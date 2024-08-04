const CustomError = require("../../errors")
const path = require('path')
const fs = require('fs');
const userServices = require("./user.services");
const { StatusCodes } = require("http-status-codes");
const generateJwtToken = require("../../utils/generateJwtToken");

// controller for register or create new user
const createUser = async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;
    if(!firstName || !lastName || !userName || !email || !password) {
        throw new CustomError.BadRequestError("Missing user data in request body!")
    }

    // check the file uploaded or not
    if (!req.files || Object.keys(req.files).length === 0) {
        throw new CustomError.BadRequestError('No files were uploaded.')
    }

    const folderPath = path.join('uploads', userName)

    // Ensure the directory is exists or not, if not, create new directory
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true })
    }

    const fileName = req.files.profileImage.name
    const filePath = path.join(folderPath, fileName)
    await req.files.profileImage.mv(filePath)

    req.body.profileImage = filePath
    const user = await userServices.createUser(req.body)
    if(!user){
        throw new CustomError.BadRequestError("Failed to create new user!")
    }

    const { password: pwd, ...otherUserInfoWithoutPass } = user.toObject()

    res.status(StatusCodes.CREATED).json({
        status: "success",
        message: "User successfully created",
        data: otherUserInfoWithoutPass
    })
}

// controller for user login
const userLogin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        throw new CustomError.BadRequestError(
            'Please provide email and password!'
        )
    const user = await userServices.getUser(email)
   
    if (!user)
        throw new CustomError.BadRequestError('Invalid email or password!')

    // check the password is correct
    const isPasswordMatch = await user.comparePassword(password)

    if (!isPasswordMatch)
        throw new CustomError.BadRequestError('Invalid email or password')

    // generate token
    const payload = {
        email: user.email,
        userName: user.userName
    }
    const token = await generateJwtToken(payload)

    const { password: pwd, ...otherUserInfoWithoutPass } = user.toObject()

    otherUserInfoWithoutPass.token = token

    res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Login successfull',
        data: otherUserInfoWithoutPass,
    })
}


module.exports = {
    createUser,
    userLogin,
}