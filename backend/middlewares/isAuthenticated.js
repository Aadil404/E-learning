import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token; //get the token from the cookie

    if (!token) {
      return res.status(401).json({ sucess: false, message: "User not logged in" });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY); //verify the token using secret key
    if (!decode) {
      return res.status(401).json({ sucess: false, message: "Invalid token" });
    }

    req.id = decode.userId; //get the user id from the payload

    next();
  } catch (error) {
    console.log("Error in isAuthenticated", error);
    return res.status(500).json({sucess: false, message: "Internal server error"})
  }
};

export default isAuthenticated;
