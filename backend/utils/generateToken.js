import jwt from 'jsonwebtoken';

export const generateToken = (user, res, message) => {
    //createing jwt token using user id and secret key
    const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: "1d"});  

    //send the token in the cookie of http response
    return res
        .status(200)
        .cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
        .json({sucess: true, message, user});
}