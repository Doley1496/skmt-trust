/* */

import React, { useState } from "react";

import Layout from "../../Components/All/Layout.jsx";
import styled from "styled-components";

import AdminMenu from "../../Components/All/AdminMenu.jsx";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../../firebase.js";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

const createServices = () => {
  /* */

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [files, setFiles] = useState([]);

  const [fileUploadError, setFileUplaodError] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [fileUploadPercentage, setFileUploadPercentage] = useState();

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [Inputs, setInputs] = useState({
    name: "",
    description: "",
    photo: [],
  });

  const change = (event) => {
    /* */

    if (event.target.type === "text" || event.target.type === "textarea") {
      setInputs({ ...Inputs, [event.target.id]: event.target.value });
    }

    /* */
  };

  const handleCreateService = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      /* Giving some conditions to create a product. 
      
         The user must upload atleast one image for creating a product.
         So when the user tries to create a listing without uploading any image we will return 
         an error message using the setError() function.
      */

      if (Inputs.photo.length < 1) {
        return setError("You must upload atleast one image");
      }

      setError(false);

      setLoading(true);

      const res = await fetch(`${VITE_SERVER_URL}/api/service/create-service`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        /* In body sending all the data's of the inputs fields. */
        body: JSON.stringify({
          ...Inputs,
        }),

        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        /* */

        if (data.statusCode === 401) {
          /* */

          setLoading(false);

          dispatch(signOutUserSuccess());

          localStorage.clear();

          alert(
            "Your cookie is mismatched or expired. You are signing out of our account!"
          );

          toast.success("Successfully Logged Out");

          return;

          /* */
        } else {
          /* */

          toast.error(data.message);

          setLoading(false);

          return;

          /* */
        }

        /* */
      }

      setLoading(false);

      toast.success("Successfully created the service");

      navigate("/dashboard/admin/display-services");

      /* Catching the error and displaying it to the frontend. */
    } catch (error) {
      /* */

      setLoading(false);

      toast.error("Something went wrong. Please try again later!");

      /* */
    }

    /* */
  };

  /* ************************************************************************* */
  /* *********************  TO STORE IMAGE IN FIREBASe  ********************** */
  /* ************************************************************************* */

  /* Creating a function name storeImage() and passing(calling) it inside push function of the
     handleImageUpload() function.

     Inside this function we will return a new-promise which will contain the parameters resolve and reject
     so that we can resolve or reject if any errors occurs while uploading the files(images) because we will 
     have to wait for the images to be uploaded in our firebase-storage.
     
     And inside this return function we will:

      * 1st we will get the storage using a firebase method getStorage().
      * 2nd Create a unique file name.
      * 3rd create a storage-reference using a firebase method ref().
      * 4th create a upload-task using a firebase method uploadBytesResumable().
   
     Once we created a upload-task we will set the upload-task by uploadTask.on() and pass 
    "state_changed" and if any errors occurs we will reject that error and get the downloadUrl().
  */

  const storeImage = async (file) => {
    /* */

    return new Promise((resolve, reject) => {
      /* */

      /* Getting a storage using a firebase method getStorage() and we are passing app 
         which is the variable where firebase is initialized and storing it in a variable say storage.     
      */
      const storage = getStorage(app);

      /* Creating an unique file name using current time of our computer along with file.name. */
      const fileName = new Date().getTime() + file.name;

      /* Creating a storage-reference to know in which particular place we will save the storage 
         using a firebase method ref() and we are passing the storage and fileName inside it and
         storing it in a variable say storageRef.
      */
      const storageRef = ref(storage, fileName);

      /* To see the percentage of the uploading file we are using a firebase method uploadBytesResumable() 
         and passing the storageRef and file and storing it in a variable say uploadTask.
      */
      const uploadTask = uploadBytesResumable(storageRef, file);

      /*  We can use this variable uploadTask to get the percentage and also the error.
  
          Once we created a upload-task we will set the upload-task by uploadTask.on() and pass 
          "state_changed" and a callback function passing the snapshot inside that function.
          Then we will get the error and then get the downloadUrl().
      */
      uploadTask.on(
        /* Here "state_changed" will track the changes and gives us a snapshot first which we will use to 
           create the progress and to set the percentage. Here we will upload more then one file. 
        */
        "state_changed",

        /* snapshot is a peice of information from each state change and we can just record the progress
           which is the percentage of upload by just saying snapshot.bytesTransferred / snapshot.totalBytes
           and we will have to multiply by 100 to get the percentage because that is something between 0 to 1
        */
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          /* Then we will set the FileUploadPercentage with the progress variable where we have stored the
             percentage value of the uploading file. We will get the % in decimal form therefore we are 
             converting the % to the integer form using Math.round() method. 
          */

          setFileUploadPercentage(`Upload is ${progress}% completed`);
        },

        /* If any errors occurs while uploading the file(image) we will reject that error. */
        (error) => {
          reject(error);
        },

        /* After rejecting the error we will get the Url.
           We will create a callback function and use a firebase method call getDownloadURL() and pass
           uploadTask.snapshot.ref inside it and if the upload is successful then we will get the 
           downloadURL. After getting the downloadURL we will resolve this downloadURL.
        */
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );

      /* */
    });

    /* */
  };

  /* ************************************************************************* */
  /* ************************  HANDLING IMAGE UPLOAD  ************************ */
  /* ************************************************************************* */

  /* Creating a function name handleImageUpload() and passing(calling) it in the onClick event of the 
     upload button.  ie... when we will click on the Upload button then this function will get execute 
     and inside this function we have written the logic to upload all the files(images) of the properties 
     into our application.
  */

  const handleImageUpload = (event) => {
    /* */

    /* 1st we will check the number of files(images).
       If the number of files we want to upload for a particular property in our application is 
       greater then 0 and the number of files together with the previous url's is less then 7 then 
       only we will upload the files(images).
    */
    if (files.length > 0 && files.length + Inputs.photo.length < 7) {
      /* */

      /* While uploading any image we want to show Loading... in the Upload button so we will set the 
         uploading array of the useState() hook as true. 
      */
      setUploading(true);

      /* At starting there will be no errors so we will set the file-upload-error array of the useState() 
         hook as false.
      */
      setFileUplaodError(false);

      /* We will create a empty array name promise because we are going to upload not only one image but 
         we want to upload more then one image so we will wait for all of them ie.. one by one images
         should be uploded to the storage.
      */
      const promise = [];

      /* Then we will run a for loop from 0 to the length of the files and we will push all the 
         files(images) one by one in the empty promise array by using a function storeImage().
         In this function we will pass(upload) all the files(images) one by one for every iteration.
      */
      for (let i = 0; i < files.length; i++) {
        promise.push(storeImage(files[i]));
      }

      /* We will have to wait for all of the files(images) and this Promise will going to wait for 
         every files present in the promise array variable. ie. Inside the promise we have all the 
         files(images) which we got it from storeImage() function.
  
         And if we get all the promise's successfully then we will get the urls for each files(images).
  
        *  After getting the urls we will set the Inputs array with the previous information of the
           Inputs array and we will set the imageUrl field with the previous urls and the new urls 
           together using concat() method because we don't want to replace everything we want to keep 
           the previous images inside the Inputs array.
  
        *  And we will set the file-upload-error array of the useState() hook as false because at 
           starting there will be no errors.
  
        *  And we will set the uploading array of the useState() hook as false because at starting 
           there will not upload image automatically.
  
           The previous url will be present in Inputs array's imageUrl field ie.. Inputs.imageUrl.
  
           Else we will catch the error and we will set the file-upload-error array with a message 
                as "Image upload failed (Max 2 MB size per image)" and we will also set the 
                uploading array of the useState() hook as false.
      */

      Promise.all(promise)
        .then((urls) => {
          /* */

          setInputs({ ...Inputs, photo: Inputs.photo.concat(urls) });

          setFileUplaodError(false);

          setUploading(false);

          /* */
        })
        .catch((error) => {
          /* */

          setFileUplaodError("Image upload failed (Max 2 MB size per image)");

          /* */
        });

      /* When length is out of the range we will set the file-upload-error with a message
         ie..  "You can only upload 6 images per listing." and we will also set the uploading 
                array of the useState() hook as false because after uploading any image we don't 
                want to show Loading...
      */
    } else {
      /* */

      setFileUplaodError("You can only upload 6 images per product.");

      setUploading(false);

      /* */
    }

    /* */
  };

  /* ************************************************************************* */
  /* ************************  DELETE IMAGE UPLOAD  ************************** */
  /* ************************************************************************* */

  /* Creating a function name handleUploadedImageDelete() and passing(calling) it in the onClick event 
     of the delete button of the image preview section below image-upload section.
     ie... when we will click on the Delete button then this function will get execute and inside this 
     function we have written the logic to delete that particular file(image) from the preview section. 
  */

  const handleUploadedImageDelete = (index) => {
    /* */

    /* 1st we will set the Inputs array by its setter function ie. setInputs() and we will pass all
       the previous data's of Inputs array and then we will filter the image-url's from the Inputs 
       array using the filter method.
       ie. We will remove(filter) the url that is present only in this current particular index.
           And we will keep the url's that doesn't match with the current particular index by 
           simply providing a condition ie.. currentUrl !== index  
    */
    setInputs({
      /* */

      ...Inputs,

      photo: Inputs.photo.filter((_, url) => url !== index),

      /* */
    });

    /* */
  };

  /* ******************************************************************************** */
  /* *****************************      return     ********************************** */
  /* ******************************************************************************** */

  return (
    /* */

    <Wrapper>
      {/* */}

      <Layout title={"Create-Service-Page"}>
        {/* */}

        <div className="container-fluid m-3 p-3">
          {/* */}

          {/* Using grid to separate the contents in two parts :
              1st part contains admin's menu and 
              2nd part contains all the products.
          */}

          <div className="row">
            {/* */}

            {/*********************************************************** */}
            {/* 1st part contains admin's menu :  */}
            {/* Using the AdminMenu Component to display the admin-menu.  */}

            <div className="col-md-3">
              <AdminMenu />
            </div>

            {/***************************************************** */}
            {/* 2nd part contains option to manage all the Services */}

            <div className="col-md-9 responsive ">
              {/* */}

              <h1 className="ml-[250px] text-4xl text-gray-700 mb-5 pt-5 font-mono responsive-heading">
                Create a New Service
              </h1>

              <div className="m-1 flex flex-col pl-[10px]">
                {/* */}

                {/* ****************************************************************************** */}
                {/* ******************  Input fields for the product's schema ******************** */}
                {/* ****************************************************************************** */}

                {/* **************************************************** */}
                {/* Creating a input field for Writing the service name. */}

                <div className="mb-5 ml-[70px] responsive-name">
                  {/* */}

                  <input
                    type="text"
                    id="name"
                    placeholder="Enter the Name of the Service"
                    className="border py-4 mb-3 rounded-lg text-center bg-gray-600 font-serif w-[55%] ml-[70px] 
                   cursor-pointer mr-3 text-[19px] text-gray-100 responsive-inputs"
                    value={Inputs.name}
                    onChange={change}
                    required
                  />

                  {/* */}
                </div>

                {/*  ******************************************************** */}
                {/*  Creating a textarea for writing the product description. */}

                <div className="ml-[70px] mb-5 responsive-textArea">
                  <textarea
                    type="text"
                    id="description"
                    placeholder="Enter the Description of the Service"
                    className="border py-3 mb-2 rounded-lg text-center bg-gray-600 w-[55%]
                    cursor-pointer ml-[70px] text-[19px] text-gray-100 font-serif pt-5 responsive-inputs"
                    value={Inputs.description}
                    onChange={change}
                    required
                  />
                </div>

                {/******************************************************** */}
                {/********************* Image Upload ********************* */}

                <div className="flex flex-col flex-1 gap-4 ml-[80px] mb-6 responsive">
                  {/* */}

                  {/* *********************************** */}
                  {/* Creating a heading for image-upload */}

                  <p className="font-semibold mb-3 font-serif ml-[60px] text-2xl">
                    Images :
                    <span className="font-semibold text-gray-600 pl-4 font-serif">
                      The first image will be the cover (max 6)
                    </span>
                  </p>

                  {/* *************************************************************** */}
                  {/* Creating an input field along with a button to upload an image. */}

                  <div className="flex gap-6">
                    {/* */}

                    <input
                      type="file"
                      id="images"
                      accept="image/*"
                      multiple
                      className="p-3 border border-gray-300 rounded ml-5 text-2xl"
                      onChange={(event) => {
                        setFiles(event.target.files);
                      }}
                    />

                    <button
                      type="button"
                      disabled={uploading}
                      onClick={handleImageUpload}
                      className="py-2 px-4 mr-10 bg-green-700 border text-white rounded-lg uppercase 
                      text-2xl hover:shadow-lg disabled:opacity-80 w-[140px] font-serif responsive-upload"
                    >
                      {uploading ? "Uploading..." : "Upload"}
                    </button>

                    {/* */}
                  </div>

                  {/* ************************************************************ */}
                  {/* Displaying how much % image is uploaded to firebase storage. */}

                  <p className="text-green-700 font-semibold text-2xl ml-[60px]">
                    {fileUploadPercentage && fileUploadPercentage}
                  </p>

                  {/* ************************************************************ */}
                  {/* If any errors occurs we will display that error in red text. */}

                  <p className="text-red-700 font-semibold text-2xl ml-[60px]">
                    {fileUploadError && fileUploadError}
                  </p>

                  {/* If we have one or more then one image in our Inputs array then we will dynamically 
                      access only the image-url's of the above Inputs array of the useState() using map 
                      function and pass all its url's data's in the url parameter and index's in index 
                      parameter. 
                      And we will display all the images present in the Inputs array as preview before final 
                      creation and we will provide a delete button to delete a particular image if needed.
                  */}

                  {Inputs.photo.length > 0 &&
                    Inputs.photo.map((url, index) => (
                      <div
                        key={url}
                        className="flex justify-between p-3 border items-center"
                      >
                        <img
                          src={url}
                          alt="service-image"
                          className="w-20 h-20 object-cover rounded-lg"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            handleUploadedImageDelete(index);
                          }}
                          className="text-red-700 p-3 uppercase rounded-lg font-semibold hover:opacity-95 
                          text-2xl disabled:opacity-80 font-serif mr-[350px] responsive-delete"
                        >
                          Delete
                        </button>
                      </div>
                    ))}

                  {/* */}
                </div>

                {/************************************************ */}
                {/* Creating a button to create(save) the service. */}

                <button
                  onClick={handleCreateService}
                  disabled={loading || uploading}
                  className="py-[25px] bg-slate-700 text-gray-300 rounded-lg uppercase hover:opacity-95 
                  font-bold text-2xl disabled:opacity-80 w-75 ml-[50px] font-serif responsive-button"
                >
                  {loading ? "Creating..." : "Create Service"}
                </button>

                {/* ************************************************************ */}
                {/* If any errors occurs we will display that error in red text. */}

                <p className="text-red-700 text-sm">{error && error}</p>

                {/* */}
              </div>

              {/* */}
            </div>

            {/* */}
          </div>

          {/* */}
        </div>

        {/* */}
      </Layout>

      {/* */}
    </Wrapper>
  );
};

/* **************************************************************************************** */
/* Using media-queries of styled of styled-components we are providing responsiveness for 
   mobile size and storing in a variable Wrapper. This Wrapper will be use to wrap the whole 
   elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive {
      margin-right: 20px;
      margin-left: 0px;
      padding: 5px;
      font-size: 1.5rem;
      display: flex;
      flex-direction: column;
    }

    .res-left {
      margin: 0px;
    }

    .responsive-inputs {
      margin-left: 40px;
    }

    .responsive-button {
      margin: auto;
    }

    .responsive-heading {
      margin: auto;
    }

    .responsive-text {
      font-size: 1.5rem;
    }

    .responsive-select {
      width: 75%;
      margin: auto;
    }

    .responsive-name {
      margin: auto;
      width: 140%;
    }

    .responsive-textArea {
      margin: auto;
      width: 140%;
    }

    .responsive-brand {
      margin-left: 25px;
    }

    .responsive-delete {
      margin: auto;
    }

    /* */
  }

  /* */
`;

export default createServices;
