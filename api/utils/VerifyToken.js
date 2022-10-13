import jwt from "jsonwebtoken";
import createError from "./Error.js"
import jwtDecode from "jwt-decode";

export const verifyToken = (req, res, next) => {

    // const token = req.headers.authorization.split(' ')[1].split('\"')[1]
    const token = req.cookies.access_token
    if (!token) {
        return next(createError(401, "You are not authenticated"))
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid!"))
        }
        req.user = user;
        next()
    })
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) { 
            next();
        } else {
            return next(createError(403, "You are not authorized"))
        }
    });
}

export const verifyAdmin = (req, res, next) => {
    // const { isAdmin } = jwtDecode(req.headers['authorization'].split(' ')[1])
    verifyToken(req, res, () => {
        if (req.user.isAdmin) { 
            next();
        } else {
            return next(createError(403, "You are not authorized"))
        }
    });
}