import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

//initialize env
dotenv.config();

const authValidator = async(req, res, next) => {
  // Check if there is a token
  if(!req.headers.authorization) {
    return res.status(401).json({ status: "Failed", message: "Unauthorized user"});
  }
  
  const bearerToken = req.headers.authorization.split(" ");

  try {
    // Check if token is of appropriate format
    if(bearerToken[0] !== "Bearer") {
      return res.status(400).json({
        status: "Failed",
        message: "Invalid token format"
      })
    }

    if(!bearerToken[1]) {
      return res.status(400).json({
        status: "Failed",
        message: "Unauthorized"
      })
    }

    const token = bearerToken[1];

    // Verify token
    const decodedToken = jwt.verify(token, process.env.SECRET);
    
    // If token verification failed
    if(!decodedToken) {
      return res.status(401).json({
        status: "Failed",
        message: "Unauthorized",
        error: "Invalid auth token"
      });
    }

    // Add user role to req object for all protected routes
    req.user = {
      id: decodedToken.user._id,
      role: decodedToken.user.role,
      subscription: decodedToken.user.subscriptionType
    };

    // If all things pass, allow user proceed
    next();
    
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
};

export default authValidator;