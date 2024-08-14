/* */

import otpModel from "../Models/otpModel.js";

import userModel from "../Models/userModel.js";

import { errorHandler } from "../Middlewares/errorHandler.js";

import { otpVerification } from "../Middlewares/otpValidation.js";

import { SendVerifyEmail } from "./emailController.js";

import { generateTokens } from "../Utils/generateTokens.js";

import crypto from "crypto";

import otpGenerator from "otp-generator";

import axios from "axios";

/* **************************************************** */
/* **************************************************** */

export const SendVerificationEmailController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { email, phoneNumber } = req.body;

    const existingEmail = await userModel.findOne({ email });

    const existingPhoneNumber = await userModel.findOne({ phoneNumber });

    if (existingEmail) {
      /* */

      if (existingEmail.emailVerified === true) {
        /* */

        return next(
          errorHandler(404, "This email is verified with another account!")
        );

        /* */
      } else {
        /* */

        const token = crypto.randomBytes(32).toString("hex");

        const url = `${process.env.BASE_URL}/verify-email/${existingEmail._id}/${token}/${email}`;

        await SendVerifyEmail({
          email: email,
          subject: "Verify Email",
          message: url,
          html: `
            <p> Please click on the following link to verify your email: </p>
            <a href= "${url}"> Verify My Email Id </a>
      
            `,
        });

        res
          .status(200)
          .json({ message: "Verification mail send successfully" });

        /* */
      }

      /* */
    } else {
      /* */

      const token = crypto.randomBytes(32).toString("hex");

      const url = `${process.env.BASE_URL}/verify-email/${existingPhoneNumber._id}/${token}/${email}`;

      await SendVerifyEmail({
        email: email,
        subject: "Verify Email",
        message: url,
        html: `
             <p> Please click on the following link to verify your email: </p>
             <a href= "${url}"> Verify My Email Id </a>

        `,
      });

      res.status(200).json({ message: "Verification mail send successfully" });

      /* */
    }

    /* */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

export const VerifyEmailController = async (req, res, next) => {
  /* */

  try {
    /* */

    const existingUser = await userModel.findOne({
      _id: req.params.userId,
    });

    if (!existingUser) {
      return next(errorHandler(404, "User does not exist"));
    }

    if (existingUser) {
      /* */

      const updatedUserInfo = await userModel.findByIdAndUpdate(
        /* */

        /* Finding the user whose details we will update on basis of his id. */
        req.params.userId,

        {
          $set: {
            emailVerified: true,
            email: req.params.email,
            terms: true,
          },
        },

        { new: true }

        /* */
      );

      /* If not successfully updated then we will return a error response message. */
      if (!updatedUserInfo) {
        res.status(400).json({
          status: "false",
          message: "Email verification failed",
        });
      }

      await generateTokens(res, updatedUserInfo);

      /* */
    }

    /* */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/* **************************************************** */

export const SendOTPInVerificationPageController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { phoneNumber } = req.body;

    const newOTP = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const currentDate = new Date();

    await otpModel.findOneAndUpdate(
      { phoneNumber }, // updating on the basis of the user's phone number

      { otp: newOTP, otpExpiration: new Date(currentDate.getTime()) },

      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    /* ************************************ */
    /* Using fast2sms to send otp to client */

    const apiKey = process.env.FAST2SMS_API_KEY;

    const smsData = {
      sender_id: "SKMT24",
      message: "170138",
      route: "dlt",
      language: "english",
      variables_values: newOTP,
      numbers: phoneNumber,
    };

    axios
      .post("https://www.fast2sms.com/dev/bulkV2", smsData, {
        headers: {
          Authorization: apiKey,
        },
      })
      .then((response) => {
        /* */

        res.status(200).json({
          success: true,
          message: "OTP send successfully",
          phoneNumber,
          response: response.data,
        });

        /* */
      })
      .catch((error) => {
        /* */

        res.status(400).json({
          success: false,
          message: "Unable to send OTP",
          phoneNumber,
          error,
        });

        /* */
      });

    /* */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

export const VerifyOTPInVerificationPageController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { phoneNumber, otp } = req.body;

    const otpData = await otpModel.findOne({
      phoneNumber,
      otp,
    });

    if (!otpData) {
      return next(errorHandler(404, "You entered wrong OTP"));
    }

    const isOtpExpired = await otpVerification(otpData.otpExpiration);

    if (isOtpExpired) {
      res.status(400).json({
        success: false,
        message: "Your OTP has been expired. Try login with a new OTP",
      });
    }

    const updatedUserInfo = await userModel.findOneAndUpdate(
      /* */

      { phoneNumber },

      {
        $set: {
          phoneNumber: phoneNumber,
          phoneVerified: true,
          terms: true,
        },
      },

      { new: true }

      /* */
    );

    await generateTokens(res, updatedUserInfo);

    /* */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/* **************************************************** */

export const SendOTPInProfileController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { phoneNumber } = req.body;

    const existingUser = await userModel.findOne({
      phoneNumber: req.body.phoneNumber,
    });

    if (existingUser) {
      /* */

      if (existingUser.phoneVerified === true) {
        /* */

        return next(
          errorHandler(
            400,
            "This phone number is verified with another account!"
          )
        );

        /* */
      } else {
        /* */

        const newOTP = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });

        const currentDate = new Date();

        await otpModel.findOneAndUpdate(
          { phoneNumber }, // updating on the basis of the user's phone number

          { otp: newOTP, otpExpiration: new Date(currentDate.getTime()) },

          { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        /* ************************************ */
        /* Using fast2sms to send otp to client */

        const apiKey = process.env.FAST2SMS_API_KEY;

        const smsData = {
          sender_id: "SKMT24",
          message: "170138",
          route: "dlt",
          language: "english",
          variables_values: newOTP,
          numbers: phoneNumber,
        };

        axios
          .post("https://www.fast2sms.com/dev/bulkV2", smsData, {
            headers: {
              Authorization: apiKey,
            },
          })
          .then((response) => {
            /* */

            console.log("SMS sent successfully", response.data);

            res.status(200).json({
              success: true,
              message: "OTP send successfully",
              phoneNumber,
              response: response.data,
            });

            /* */
          })
          .catch((error) => {
            /* */

            console.log("Error", error);

            res.status(400).json({
              success: false,
              message: "Unable to send OTP",
              phoneNumber,
              error,
            });

            /* */
          });

        /* */
      }

      /* */
    } else {
      /* */

      const newOTP = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      const currentDate = new Date();

      await otpModel.findOneAndUpdate(
        { phoneNumber }, // updating on the basis of the user's phone number

        { otp: newOTP, otpExpiration: new Date(currentDate.getTime()) },

        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      /* ************************************ */
      /* Using fast2sms to send otp to client */

      const apiKey = process.env.FAST2SMS_API_KEY;

      const smsData = {
        sender_id: "SKMT24",
        message: "170138",
        route: "dlt",
        language: "english",
        variables_values: newOTP,
        numbers: phoneNumber,
      };

      axios
        .post("https://www.fast2sms.com/dev/bulkV2", smsData, {
          headers: {
            Authorization: apiKey,
          },
        })
        .then((response) => {
          /* */

          console.log("SMS sent successfully", response.data);

          res.status(200).json({
            success: true,
            message: "OTP send successfully",
            phoneNumber,
            response: response.data,
          });

          /* */
        })
        .catch((error) => {
          /* */

          console.log("Error", error);

          res.status(400).json({
            success: false,
            message: "Unable to send OTP",
            phoneNumber,
            error,
          });

          /* */
        });

      /* */
    }

    /* */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

export const VerifyOTPInProfileController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { phoneNumber, otp, email } = req.body;

    const existingUser = await userModel.findOne({
      email: req.body.email,
    });

    if (existingUser.emailVerified === true) {
      /* */

      const otpData = await otpModel.findOne({
        phoneNumber,
        otp,
      });

      if (!otpData) {
        return next(errorHandler(404, "You entered wrong OTP"));
      }

      const isOtpExpired = await otpVerification(otpData.otpExpiration);

      if (isOtpExpired) {
        res.status(400).json({
          success: false,
          message: "Your OTP has been expired. Try login with a new OTP",
        });
      }

      const updatedUserInfo = await userModel.findOneAndUpdate(
        /* */

        { email },

        {
          $set: {
            phoneNumber: phoneNumber,
            phoneVerified: true,
            terms: true,
          },
        },

        { new: true }

        /* */
      );

      await generateTokens(res, updatedUserInfo);

      /* */
    }

    /* */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/* **************************************************** */

export const SendOTPForLoginController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { phoneNumber } = req.body;

    const newOTP = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const currentDate = new Date();

    await otpModel.findOneAndUpdate(
      { phoneNumber }, // updating on the basis of the user's phone number

      { otp: newOTP, otpExpiration: new Date(currentDate.getTime()) },

      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    /* ************************************ */
    /* Using fast2sms to send otp to client */

    const apiKey = process.env.FAST2SMS_API_KEY;

    const smsData = {
      sender_id: "SKMT24",
      message: "170138",
      route: "dlt",
      language: "english",
      variables_values: newOTP,
      numbers: phoneNumber,
    };

    axios
      .post("https://www.fast2sms.com/dev/bulkV2", smsData, {
        headers: {
          Authorization: apiKey,
        },
      })
      .then((response) => {
        /* */

        res.status(200).json({
          success: true,
          message: "OTP send successfully",
          phoneNumber,
          response: response.data,
        });

        /* */
      })
      .catch((error) => {
        /* */

        res.status(400).json({
          success: false,
          message: "Unable to send OTP",
          phoneNumber,
          error,
        });

        /* */
      });

    /* */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

export const VerifyOTPForLoginController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { phoneNumber, otp } = req.body;

    const existingUser = await userModel.findOne({
      phoneNumber: req.body.phoneNumber,
    });

    if (existingUser) {
      /* */

      const otpData = await otpModel.findOne({
        phoneNumber,
        otp,
      });

      if (!otpData) {
        return next(errorHandler(404, "You entered wrong OTP"));
      }

      const isOtpExpired = await otpVerification(otpData.otpExpiration);

      if (isOtpExpired) {
        res.status(400).json({
          success: false,
          message: "Your OTP has been expired. Try login with a new OTP",
        });
      }

      const updatedUserInfo = await userModel.findOneAndUpdate(
        /* */

        { phoneNumber },

        {
          $set: {
            phoneNumber: phoneNumber,
            phoneVerified: true,
            terms: true,
          },
        },

        { new: true }

        /* */
      );

      await generateTokens(res, updatedUserInfo);

      /* */
    } else {
      /* */

      const otpData = await otpModel.findOne({
        phoneNumber,
        otp,
      });

      if (!otpData) {
        return next(errorHandler(404, "You entered wrong OTP"));
      }

      const isOtpExpired = await otpVerification(otpData.otpExpiration);

      if (isOtpExpired) {
        res.status(400).json({
          success: false,
          message: "Your OTP has been expired. Try login with a new OTP",
        });
      }

      /* Then we will create the new-user and save it. */
      const newUser = new userModel({
        phoneNumber,
        phoneVerified: true,
        terms: true,
      });
      await newUser.save();

      await generateTokens(res, newUser);

      /* */
    }

    /* */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};
