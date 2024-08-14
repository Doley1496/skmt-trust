/* */

import serviceModel from "../Models/serviceModel.js";

import slugify from "slugify";

/*********************************************************************************/
/************************ 1: Creating service Controller   ***********************/
/*********************************************************************************/

export const CreateServiceController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* Destructing all the input fields ie.. name, description, photo from req.body */
    const { name, description, photo } = req.body;

    /* Validation message If the name, description, and photo 
       is not found then we will show a message using Switch statement. 
    */
    switch (true) {
      /* */

      case !name:
        return res.status(500).send({
          message: "Name is Required",
        });

      case !description:
        return res.status(500).send({
          message: "Description is Required",
        });

      case photo && photo.size > 2000000:
        return res.status(500).send({
          message: "Photo is Required and size should be less then 2mb",
        });

      /* */
    }

    /* If we donot found the service in our database then we will create that product and save the 
       new service data. 
    */
    const CreatedService = await new serviceModel({
      /* */

      ...req.body, // using spread operator

      slug: slugify(name), // converting the name to slugify and saving it in the slug field.

      /* */
    });

    await CreatedService.save();

    /* Sending a response message when successfully created a new service. */
    res.status(200).json(CreatedService).message("New Service Added");

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};

/*******************************************************************************************************/
/***********************  2: Reading single(getting single) service Controller  ************************/
/*******************************************************************************************************/

export const GetSingleServiceController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* Destructuring the id from the api route using req.params.serviceId(name of the id we provided) */
    const id = req.params.serviceId;

    /* Getting a single service from the database services on the basis of its id by using 
       mongoose findOne({}) method and also adding some more mongoose methods according to 
       our need and we are using findOne method because we are getting only a single service.
    */

    const SingleService = await serviceModel.findById(id);

    /* Sending the Response message when we get a single service. */
    res.status(200).json(SingleService).message("Successfully got the service");

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*******************************************************************************************************/
/***********************  2: Reading all(getting all) products Controller  *****************************/
/*******************************************************************************************************/

export const GetAllServicesController = async (req, res, next) => {
  /* */

  try {
    /* */

    const AllServices = await serviceModel.find({});

    /* Sending response message when we get all the services. */
    return res.status(200).json(AllServices);

    /* Catching the error and passing it to the next() function which is a middleware to 
       handle the error. 
    */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};

/****************************************************************************************/
/**********************    3: Update service Controller  ********************************/
/****************************************************************************************/

export const UpdateServiceController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* Destructing all the input fields ie.. name, description, and photo from req.body */
    const { name, description, photo } = req.body;

    /* Validation message If the name, description, and photo 
       is not found then we will show a message using switch statement. 
    */
    switch (true) {
      /* */

      case !name:
        return res.status(500).send({
          message: "Name is Required",
        });

      case !description:
        return res.status(500).send({
          message: "Description is Required",
        });

      case photo && photo.size > 2000000:
        return res.status(500).send({
          message: "Photo is Required and size should be less then 2mb",
        });

      /* */
    }

    /* Destructuring the id from the api route using req.params.serviceId(name of the id we provided) */
    const id = req.params.serviceId;

    /* Finding and Updating the service on the basis of its service-id, by using 
       findByIdAndDelete mongoose method.
    */
    const UpdatedService = await serviceModel.findByIdAndUpdate(
      /* */

      id,

      /* What we will update */
      { ...req.body, slug: slugify(name) },

      /* In findByIdAndUpdate mongoose method we have an object which has a property call new 
         and we have to make this property as true,if we don't write this object then our products 
         will not get update. 
      */
      { new: true }

      /* */
    );

    /* Saving the product in the database so that we can add the new changes we made 
       with the Product object. 
    */
    await UpdatedService.save();

    /* Sending the response message when product successfully got updated. */
    res
      .status(200)
      .json(UpdatedService)
      .message("Successfully updated the service");

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};

/****************************************************************************************/
/************************* 4: Delete Product Controller  ********************************/
/****************************************************************************************/

export const DeleteServiceController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* Destructuring the id from the api route using req.params.serviceId(name of the id we provided). */
    const id = req.params.serviceId;

    /* Finding and deleting the service on the basis of the service-id by using findByIdAndDelete
       mongoose method and also using select() mongoose method to deselect the photo. 
    */
    const DeletedService = await serviceModel
      .findByIdAndDelete(id)
      .select("-photo"); /* We don't want the photo after delete */

    /* Sending the response message when successfully deleted the service. */
    res
      .status(200)
      .json(DeletedService)
      .message("Successfully deleted the service");

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};
