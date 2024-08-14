/* */

import userModel from "../Models/userModel.js";

import membershipModel from "../Models/membershipPaymentModel.js";

import emailSubscriptionModel from "../Models/emailSubscriptionModel.js";

import bcryptjs from "bcryptjs";

import { errorHandler } from "../Middlewares/errorHandler.js";

import ApiFeatures from "../Utils/apiFeatures.js";

/*******************************************************************************************************/
/****************************   1: To authenticate the admin Controller  *******************************/
/*******************************************************************************************************/

export const adminAuthenticationController = async (req, res, next) => {
  /* */

  try {
    /* */

    res.status(200).json({ ok: true });

    /* */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*******************************************************************************************************/
/*******************************   1 : To Update the user-profile Controller ***************************/
/*******************************************************************************************************/

export const updateUserProfileController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* 1st we will check the user who is trying to update exist in our database or not.
       ie. he is the real owner of that account or not.

       If the id of the user ( ie. the user we save in req.user in verifyToken function of verifyUser.js ) 
       is equal to the id that we will get from the /update-profile/:id route that means the user is  
       authenticated ie. it is the account of this user. Therefore in that case we will hash his password and
       find the user on basis of his id and update, then we will destruct the password separately and send 
       the response of statusCode 200 with the remaining-details of the user in json format.

       Else we will return an error by passing the middleware function errorHandler() that we created in 
       errorHandler.js with a statusCode of 401 and message as "You can only update your own account!."
       inside the next() function.
    */

    if (req.user.id === req.params.id) {
      /* */

      /* If we received the password of the user ie: when the user is trying to change the 
         password then before saving his password we will hash his password using hashSync() 
         method of bcryptjs swith 10 rounds of salting. 
      */
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }

      const updatedUser = await userModel.findByIdAndUpdate(
        /* */

        req.params.id,

        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            gender: req.body.gender,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },

        { new: true }

        /* */
      );

      const { password, ...remainingDetails } = updatedUser._doc;

      res.status(200).json(remainingDetails);

      /* */
    } else {
      /* */

      return next(errorHandler(401, "You can only update your own account!."));

      /* */
    }

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*******************************************************************************************************/
/*******************************   2 : To Delete the user-profile Controller ***************************/
/*******************************************************************************************************/

export const deleteUserProfileController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* 1st we will check the user who is trying to delete exist in our database or not.
       ie. he is the real owner of that account or not.

       If the id of the user ( ie. the user we save in req.user in verifyToken function of verifyUser.js ) 
       is equal to the id that we will get from the /delete-profile/:id route that means the user is  
       authenticated ie. it is the user we want to delete. Therefore in that case we will
       find the user on basis of its id and delete that user and send the response of statusCode 200 with 
       the listings in json format.

       Else we will return an error by passing the middleware function errorHandler() that we created in 
       errorHandler.js with a statusCode of 401 and message as "You can only delete your own account!"
       inside the next() function.
    */

    if (req.user.id === req.params.id) {
      /* */

      await userModel.findByIdAndDelete(req.params.id);

      res.status(200).json("User has been deleted.");

      /* */
    } else {
      /* */

      return next(errorHandler(401, "You can only delete your own account!"));

      /* */
    }

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/****************************************************************************************************/
/***********************  3: Reading single(getting single) user Controller  ************************/
/****************************************************************************************************/

export const GetSingleUserDetailsController = async (req, res, next) => {
  /* */

  try {
    /* */

    const email = req.params.email;

    const existingUser = await userModel.findOne({ email });

    res.status(200).send({
      success: true,
      message: "Successfully got the user",
      existingUser,
    });

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*******************************************************************************************************/
/****************************   3: To get all user's details Controller  *******************************/
/*******************************************************************************************************/

export const getAllUsersDetailsController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* Finding all the user's orders in our database collection (ie. orders) by using find({}) 
       mongoose method.

            And we will populate two things. 

          1. the products and we donot want the photo so we will de-select it.
          2. and the buyer and from this buyer we want only name so passing name.

          * and we will sort the orders on the basis of its creation time so that the latest 
            orders get visible at the top.
    */

    const AllUsers = await userModel.find({}).sort({ createdAt: "-1" });

    res.json(AllUsers);

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*******************************************************************************************************/
/********************  5: Reading all(getting all) filtered products Controller  ***********************/
/*******************************************************************************************************/

export const GetAllFilteredUsersController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* Taking a initial value to display users per-page. */
    const resultPerPage = 3;

    /* Using mongoose countDocuments() method we are counting the number of documents available
       in our database so that we can display in our frontend.
    */

    const usersCount = await userModel.countDocuments();

    /* Calling the class ApiFeatures() and getting two arguments.
       1st the mongoose find() method on our user-model and 
       2nd the query that will be pass in the url.

       And we are adding more functions with it such as search(), and
       pagination() to get the users according to the filters applied.
    */

    const apiFeature = new ApiFeatures(userModel.find(), req.query)
      .search()
      .pagination(resultPerPage);

    const AllUsers = await apiFeature.query;

    /* Calculating the products that are filtered. */
    let filteredUsersCount = AllUsers.length;

    /* Sending Response message when we get all the products. */
    return res.status(200).json({
      success: true,
      AllUsers,
      usersCount,
      resultPerPage,
      filteredUsersCount,
    });

    /* Catching the error and passing it to the next() function which is a middleware to 
       handle the error. 
    */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*******************************************************************************************************/
/**************************     6 : Creating Controller for Complain-messages  *************************/
/*******************************************************************************************************/

export const createEmailSubscriptionController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { email } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return next(
        errorHandler(404, "Your email id is already registered with us")
      );
    }

    const existingEmail = await emailSubscriptionModel.findOne({ email });

    if (existingEmail) {
      return next(
        errorHandler(404, "Your email id is already registered with us")
      );
    }

    /* Then we will create the new-user and save it. */
    const newEmail = new emailSubscriptionModel({
      email: email,
    });

    await newEmail.save();

    res.status(200).json(newEmail);

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*******************************************************************************************************/
/**************************     7 : Creating Controller for Complain-messages  *************************/
/*******************************************************************************************************/

export const ComplainMessageController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { id } = req.body;

    const existingUser = await userModel.findById(id);

    if (!existingUser) {
      return next(errorHandler(404, "Please login to sent us a message"));
    }

    const newUser = new contactModel({
      /* */

      ...req.body,

      userId: existingUser,

      /* */
    });
    await newUser.save();

    res.status(200).json(newUser);

    /* Catching the error and passing to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/****************************************************************************************************/
/***********************  8: Getting membership user details Controller  ************************/
/****************************************************************************************************/

export const getMembershipUserController = async (req, res, next) => {
  /* */

  try {
    /* */

    const membershipDetails = await membershipModel
      .find({ userId: req.params.id })
      .sort({ createdAt: -1 });

    if (membershipDetails.length !== 0) {
      /* */

      res.status(200).json(membershipDetails);

      /* */
    }

    /* Catching the error and passing to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/************************************************************* */
/* 9: Getting single user with the help of its ID Controller. */
/************************************************************* */

export const GetSingleUserDetailsUsingIDController = async (req, res, next) => {
  /* */

  try {
    /* */

    const userId = req.params.userId;

    const existingUser = await userModel.findById(userId);

    res.status(200).send({
      success: true,
      message: "Successfully got the user",
      existingUser,
    });

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};
