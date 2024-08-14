/* */

import userModel from "../Models/userModel.js";

import { errorHandler } from "../Middlewares/errorHandler.js";

import { SendResetPasswordEmail } from "./emailController.js";

import { generateTokens } from "../Utils/generateTokens.js";

import bcryptjs from "bcryptjs";

import JWT from "jsonwebtoken";

/*******************************************************************************************************/
/******************************* 1 : Testing the Controller   ******************************************/
/*******************************************************************************************************/

export const testController = (req, res) => {
  res.send("protected Routes");
};

/*******************************************************************************************************/
/***************************     2 : Creating Register Controller      *********************************/
/*******************************************************************************************************/

export const RegisterController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { email } = req.body;

    const validEmail = await userModel.findOne({
      email: req.body.email,
    });

    if (validEmail) {
      /* */

      const verifiedEmail = validEmail.emailVerified;

      if (verifiedEmail === true) {
        return next(
          errorHandler(401, "An account with this email already exist.")
        );
      }

      /* */
    }

    const validPhone = await userModel.findOne({
      phoneNumber: req.body.phoneNumber,
    });

    if (validPhone) {
      /* */

      const verifiedPhoneNumber = validPhone.phoneVerified;

      if (verifiedPhoneNumber === true) {
        return next(
          errorHandler(401, "An account with this phone number already exist.")
        );
      }

      /* */
    }

    if (validEmail) {
      /* */

      const hashedPassword = await bcryptjs.hashSync(req.body.password, 10);

      const updatedUserInfo = await userModel.findOneAndUpdate(
        /* */

        { email },

        { ...req.body, password: hashedPassword },

        { new: true }

        /* */
      );

      const { password: pass, ...remainingUserDetails } = updatedUserInfo._doc;

      res.status(200).json(remainingUserDetails);

      /* */
    } else {
      /* */

      /* Before creating the user we will hashed the password of the user using hashSync method of bcryptjs. */
      const hashedPassword = await bcryptjs.hashSync(req.body.password, 10);

      /* Then we will create the new-user and save it. */
      const newUser = await new userModel({
        ...req.body,
        password: hashedPassword,
      }).save();

      const { password: pass, ...remainingUserDetails } = newUser._doc;

      res.status(200).json(remainingUserDetails);

      /* */
    }

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*******************************************************************************************************/
/***************************     3 : Creating Login Controller      ************************************/
/*******************************************************************************************************/

export const LoginController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { email, password } = req.body;

    const validUser = await userModel.findOne({ email });

    if (validUser) {
      /* */

      var verifiedEmail = validUser.emailVerified;

      var verifiedPhoneNumber = validUser.phoneVerified;

      if (verifiedEmail === false && verifiedPhoneNumber === false) {
        return next(
          errorHandler(
            401,
            "You have not verified your email and phone number. Please verify!"
          )
        );
      }

      if (verifiedEmail === false) {
        return next(
          errorHandler(401, "You have not verified your email. Please verify!")
        );
      }

      /* */
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "Wrong Password"));
    }

    await generateTokens(res, validUser);

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*******************************************************************************************************/
/**************************      4 : Creating google-Oauth Controller     ******************************/
/*******************************************************************************************************/

export const GoogleOauthController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* When user's email exists in our database then we will signIn the user :
          To signIn a user we have to ----

         * create a token
         * destruct its password and other remaining-details separately and
         * set the cookie and send a response status of 200 and the remaining details of the 
           user in the json format.     


       If user's email doesn't exist in our database then we will create a new user and save it.

          To create a user we have to ----

         * generate a random password.
         * then we will hashed that password.
         * then we will create that new user and save it.
         * create a token.
         * destruct its password and other remaining-details separately and
         * set the cookie and send a response status of 200 and the remaining details of the 
           user in the json format.
      
    */

    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      /* */

      await generateTokens(res, existingUser);

      /* */
    } else {
      /* */

      /* Generating a random password because in our model we gave password field as required and 
         if we donot provide a password then we will get an error.
         By signing up with google we don't actually get a password from google.
         Therefore we will generate a random password for the user and whenever the user wants 
         to update the password they can update their password.

         We are creating a unique password of 16 characters. 8 + 8 
         Using Math.random() we are generating a number and converting the number to string 
         Here. 36 means numbers from 0 to 9 and also letters from a-z ie. it will form a password
         with random numbers and letters together and we will take only the last eight digits from 
         both the generated string (password) and formed a 16 digit characters.

      */

      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

      /* Then we will create the new-user and save it. */
      const newUser = new userModel({
        /* */

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: req.body.photo,
        password: hashedPassword,
        emailVerified: true,
        terms: true,

        /* */
      });
      await newUser.save();

      await generateTokens(res, newUser);

      /* */
    }

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*******************************************************************************************************/
/*****************************    5 : Creating SignOut Controller     ***********************************/
/*******************************************************************************************************/

export const LogOutController = async (req, res, next) => {
  /* */

  try {
    /* */

    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json("Successfully logged Out!");

    /* Catching the error and passing to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*******************************************************************************************************/
/**************************     6 : Creating Controller for forgot-password    *************************/
/*******************************************************************************************************/

export const SendLinkController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* 1. Destructing the email from req.body and checking this email exist in our database or not : */

    const { email } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return next(
        errorHandler(
          404,
          "User doesn't exist. Please enter your registered email id"
        )
      );
    }

    /* 2. Create token :  */

    const token = JWT.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    /* 3. Then we will create a link which we will send to the user's email through which the user
          will reset his password and in this link we will also pass the user's id and the token created.
    */

    const url = `${process.env.BASE_URL}/reset-password/${existingUser._id}/${token}`;

    /* 4. Sending the link we created to the user's email using nodemailer. */

    SendResetPasswordEmail({
      email: existingUser.email,
      subject: "Password change request link received",
      message: url,
      html: `
      <p> Please click on the following link to reset your password: </p>
      <a href= "${url}"> Reset Password </a>
     
      `,
    });

    /* 5. After sending the email successfully we will send a response of 200 with a message. */

    res.status(200).json({
      status: "success",
      message: "Password reset link has been send to your email.",
    });

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*******************************************************************************************************/
/**************************     7 : Creating Controller to reset-password   ****************************/
/*******************************************************************************************************/

export const ResetPasswordController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* 1. We are getting the newPassword and confirmPassword that the user enter's in the input 
          field using req.body.

          And we are also getting the id and the token of the user from the route using req.params 
          and checking that user's id exist in our database or not.
     
          If the id does not exist then we will send that "User does not exist".
    */

    const { newPassword, confirmPassword } = req.body;

    const { id, token } = req.params;

    const existingUser = await userModel.findOne({ _id: id });

    if (!existingUser) {
      errorHandler(
        404,
        "User doesn't exist. Please enter your registered email id"
      );
    }

    /* 2. If the user's id exist in our database then we will check the password and the 
          confirm-password is matching or not.
          If both the pasword is matching then we will verify that this link is active or expired.
          Else we will return an error message.

          We will verify by using verify method of json-web-token(JWT) on basis of the user's token, 
          and the user's secret_key.

          We will create this secret_key by the combination of jwt-secret and user's password.

          If verified(active) then we will find the id, hashed the password, update the password 
          and if updated we will return a success message. 
          Else we will return a message that link has expired.
    */

    if (newPassword === confirmPassword) {
      /* */

      const verify = await JWT.verify(token, process.env.JWT_SECRET);

      if (verify) {
        /* */

        const isUser = await userModel.findById(id);

        const hashedPassword = bcryptjs.hashSync(newPassword, 10);

        const isSuccess = await userModel.findByIdAndUpdate(isUser._id, {
          /* */

          /* What we will update */
          $set: {
            password: hashedPassword,
          },

          /* */
        });

        /* If successfully updated then we will return a success response message. */
        if (isSuccess) {
          res.status(200).json({
            status: 200,
            message: "Password changes successfully",
          });
        }

        /* */
      } else {
        /* */

        res.status(200).json({
          status: 200,
          message: "Link has been expired",
        });

        /* */
      }

      /* */
    } else {
      /* */

      return res
        .status(400)
        .json({ message: "Password and confirm password doesn't match." });

      /* */
    }

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};
