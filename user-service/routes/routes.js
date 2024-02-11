const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');

router.use(express.json());
router.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
router.use(cookieParser());

const createPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@/])[A-Za-z\d@/]{8,}$/;
    return passwordRegex.test(password);
};


/**
 * @openapi
 * '/users/register':
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully. Please login.
 *       400:
 *         description: Password must be 8 characters long with at least one uppercase letter, one lowercase letter, one number, and one of the special characters @ or /
 *       409:
 *         description: User already exists with this email
 *       500:
 *         description: Internal Server Error
 */
router.post('/users/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists with this email' });
        }

        if (!createPassword(password)) {
            return res.status(400).json({ message: 'Password must be 8 characters long with at least one uppercase letter, one lowercase letter, one number, and one of the special characters @ or /' });
        }

        const hash = await bcrypt.hash(password, 10);
        await UserModel.create({ name, email, password: hash });

        // Cache the newly registered user data
        await cacheUserData(email, { name, email });

        return res.status(201).json({ message: 'User created successfully. Please login.' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});


/*Scope of improvement: Creating a middleware for verifying the user token in the root file
and using it in the routes. This will prevent code duplication and make the code more readable.*/

const verifyUser = (req, res, next) => {
    const usertoken = req.cookies.usertoken;
    if (usertoken) {
        jwt.verify(usertoken, "auth_token_key_header", (err, decoded) => {
            if (err) {
                return res.status(400).json("Invalid token");
            } else {
                req.email = decoded.email;
                next();
            }
        });
    } else {
        return res.status(404).json("Token is missing");
    }
}

/**
 * @openapi
 * '/users/auth':
 *   get:
 *     tags:
 *       - User
 *     summary: Authenticate a user
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Not Admin
 *       500:
 *         description: Internal Server Error
 */


router.get('/users/auth', verifyUser, (req, res) => {
    const userEmail = req.email;
    res.status(200).json({ message: "Success" , email: userEmail});
})

/*Scope of improvement: Creating a middleware for verifying the admin token in the root file
and using it in the routes. This will prevent code duplication and make the code more readable. Tried this way
but it was not fetching the token.*/

const verifyAdmin = (req, res, next) => {
    const admintoken = req.cookies.admintoken;
    if (admintoken) {
        jwt.verify(admintoken, "auth_token_key_header", (err, decoded) => {
            if (err) {
                return res.status(400).json("Invalid token");
            } else {
                next();
            }
        });
    } else {
        return res.status(404).json("Token is missing");
    }
}

/**
 * @openapi
 * '/users/admin/auth':
 *   get:
 *     tags:
 *       - User
 *     summary: Authenticate an admin
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Not Admin
 *       500:
 *         description: Internal Server Error
 */

router.get('/users/admin/auth', verifyAdmin, (req, res) => {
    res.status(200).json("Success");
})

/**
 * @openapi
 * '/users/login':
 *   post:
 *     tags:
 *       - User
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Login failed
 *       500:
 *         description: Internal Server Error
 */

/*Scope of improvement: Creating a env file for storing the secret key and using it in the routes.*/

router.post('/users/admin/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email, role: user.role }, 'auth_token_key_header', { expiresIn: '1d' })
                        res.cookie('admintoken', token, { httpOnly: true })
                        return res.status(200).json({ status: "successful", token, role: user.role, message: "Login successful" })
                    } else {
                        return res.status(401).json({ message: "Login failed" })
                    }
                })
            } else {
                return res.status(401).json({ message: "Auth failed" })
            }
        }).catch(err => res.status(500).json({ message: err.message }));
})

/**
 * @openapi
 * /users/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Login failed
 *       500:
 *         description: Internal Server Error
 */

router.post('/users/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email, role: user.role }, 'auth_token_key_header', { expiresIn: '1d' })
                        res.cookie('usertoken', token, { httpOnly: true })
                        return res.status(200).json({ token, role: user.role, message: "Login successful" , name: user.name})
                    } else {
                        return res.status(401).json({ message: "Login failed. You can forget password or try logging in again." })
                    }
                })
            } else {
                return res.status(401).json({ message: "Auth failed. Please register" })
            }
        }).catch(err => res.status(500).json({ message: err.message }));
})

/**
 * @openapi
 * '/users':
 *   get:
 *     tags:
 *       - User
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */

router.get('/users', (req, res) => {
    UserModel.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ message: err.message }));
})

module.exports = router;
