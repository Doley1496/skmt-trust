/* */

/* Using useSelector() hook we are destructing (importing) currentUser, loading and 
     error from the initial-state (ie. currentUser) of the userSlice variable using the
     global state user. 
  */
const { currentUser } = useSelector((state) => state.user);

/* Creating a useState() hook to hold the value of the files(images) to be uploaded and 
          passing its initial value an array (empty-array) because it can contain many files. 
       */
const [files, setFiles] = useState([]);

/* Creating a useState() hook to store the error that can occur during uploading of the file 
             in the array say fileUploadError and passing the initial value as false.
          */
const [fileUploadError, setFileUplaodError] = useState(false);

/* Setting the error array of the useState() hook as false using the setError() function because 
              initially there will be no errors. 
           */
setError(false);

/* Setting the loading array of the useState() hook as true using the setLoading() function 
                 because when file is uploading we will display text as Loading... inside the upload button. 
              */
setLoading(true);

/*  After converting the response into json format and saving it in the data variable we will
               set the loading array of the useState() hook as false using the setLoading() function 
               because after sending the request we will not show Loading... inside the upload button.  
           */
setLoading(false);

/* Sending a get network request(ie. making an api call) to the following route using fetch
              to get all the categories.
           */

const res = await fetch(`${VITE_SERVER_URL}/api/service/getAllServices`, {
  method: "GET",
  credentials: "include",
});

/* Creating an useEffect() hook and calling the getAllServices() function so that in initial time 
          we can get all the products created by the admin in createService page and passing an empty 
          array as dependencies because we want to get the services only once.
       */

useEffect(() => {
  /* */

  getAllServices();

  /* */
}, []);

/* Returning the content that we will display in the "/dashboard/admin" route.
          because for this route we have provide component {<AdminDashboardPage />}
          ie. <Route path="admin" element={<AdminDashboardPage />} />.
       */
return (
  /* */

  <Wrapper>
    {/* */}

    <Layout title={"Admin-Dashboard-Page"}>
      {/* */}

      <div className="col-md-3 mb-6">
        <AdminMenu />
      </div>

      {/* */}
    </Layout>

    {/* */}
  </Wrapper>

  /* */
);

/* Creating a function with name change() and passing it in the onChange event of the 
          inputs fields of the create-service page.
          onChange() event will temporarily save the data of the input fields.
          ie.. The onChange() event attribute fires the event when the element loses focus.
       */

const change = (event) => {
  /* */

  if (event.target.type === "text") {
    setInputs({ ...Inputs, [event.target.id]: event.target.value });
  }

  /* */
};

/* After getting the response we will convert the response that we got into json format. */
const data = await res.json();

/* If we cannot successfully make an api call ie. when we will get success message as 
              false then we will display a toast error message of the backend and simply return.
           */

/* If we cannot successfully make an api call ie. when we will get success message as 
                false then we will display a toast error message of the backend and simply return.
             */
if (data.success === false) {
  /* */

  toast.error(data.message);

  return;

  /* */
}

/* Sending a POST fetch request to the following route to send the necessary information of the
              user that we will received from the user entered in the inputs fields such as its email 
              and password to the back-end so that we can SignIn the existing user 
              
             The browsers will only expose(show) the response to the frontend JavaScript code if the 
             Access-Control-Allow-Credentials value is true.
             Therefore to set Access-Control-Allow-Credentials value as true 1st we will have to pass the 
             credentials as "include" and when we will pass its value as true inside the cors() function then 
             it will expose the response to the frontend. 
             After adding this only we will get the cookies,updated values etc.
     
             Credentials are cookies, authorization headers, or TLS client certificates.
           */
const response = await fetch(`${VITE_SERVER_URL}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(Inputs),
  credentials: "include",
});

/* Dispatching the reducer function ie.. signInFailure() function created inside the userSlice 
                variable by using dispatch() function and passing the error message in it.
             */
dispatch(signInFailure(data.message));

/* Else if we successfully make an api call then we will dispatch the reducer function 
              ie.. signInSuccess() function created inside the userSlice variable and pass the data in it by 
              using the dispatch() function and we will redirect(navigate) the user to the home-page.
           */
dispatch(signInSuccess(data));

/* Creating a useState() hook to store the boolean value for the profile-deletion in deletedMessage array.
          ie. when user's profile gets sucessfully deleted we will set it true using its setDeletedMessage()
          setter function and passing its initial value as false because initially we will not delete the user.
       */
const [deletedMessage, setDeletedMessage] = useState(false);

/* Creating a useState() hook to hold the value of the inputs fields ie. form such as the profile-photo
          username email and password and passing its initial value as empty object because initilly its values
          will be empty.
       */
const [Inputs, setInputs] = useState({});

/* Importing useDispatch from react-redux to call the function of the reducers.
        Importing useSelector from react-redux to destruct (import) loading and error from the 
        global state user.
     */
import { useSelector } from "react-redux";

/* Creating useEffect hook and passing getAllTickets() function to get all the tickets
          in initial time and passing createTickets in the array as dependencies.
       */

useEffect(() => {
  /* */

  getAllTickets();

  getAllBooks();

  /* */
}, []);

/* ******************************** 2: Registering(SignUp) a new user ******************************** */

/* Creating a route(api endpoint) ie. /register and when this api endpoint will be call using 
        fetch/axios then the controller ie. RegisterController will get execute and inside this controller 
        we have written the logic how to register a new user.
     */
router.post("/register", RegisterController);

/* ******************************** 5: Signing Out a user(SignOut) ******************************** */

/* Creating a route(api endpoint) ie. /signOut and when this api endpoint will be call using 
        fetch/axios then the controller ie. signOutController will get execute and inside this controller 
        we have written the logic to signOut an existing logged in user.
     */
router.get("/logOut", LogOutController);

/* ************************************************* */
/* *******************   CRUD  ********************* */
/* ************************************************* */

/* Creating different routes(api endpoints) ex. /create-service, /getAllServices etc. and when 
        this api endpoints will be call using axios/fetch then its respective controller will get 
        execute ex. CreateServiceController for /create-service route , GetAllServicesController for 
        /getAllServices and in this controllers we have written the logic to create a new service, 
        to get all the services, etc.
        To create, update, and delete a service we are passing middlewares because only admin and the 
        admin should be signIn to create a new service.
        To get we are not passing any middlewares because everyone can see the service.
     */

router.post("/create-service", verifyToken, isAdmin, CreateServiceController);

/* Creating a route(api endpoint) ie. /getSingleService/:serviceId and when this api endpoint 
        will be call using axios then the controller ie. GetSingleServiceController will get execute 
        and in this controller we have written the logic to display only a single service.
        We are not passing any middlewares because we want to show any single service to all the users.
        We want to get a single service dynamically on the basis of product-id so passing its id dynamically.
     */
router.get("/getSingleService/:serviceId", GetSingleServiceController);

/* Creating a route(api endpoint) ie. /update-service/:serviceId and when this api endpoint will be 
        call using axios then the controller ie. UpdateServiceController will get execute and in this 
        controller we have written the logic to update a service.
        We are passing middlewares because only admin and the admin should be signIn to update a service.
        We want to update the service dynamically on the basis of service-id so passing its id dynamically.
     */

router.put(
  "/update-service/:serviceId",
  verifyToken,
  isAdmin,
  UpdateServiceController
);

/* Finding the phone number entered by the user is a existing phone number or not in our database
       using findOne() mongoose method on the basis of the user's phone number.
    */
const validPhone = await userModel.findOne({
  phoneNumber: req.body.phoneNumber,
});

/* If the user's phone number already exists in our database ie. already registered then we 
         will return an error by passing the middleware function errorHandler() that we created in 
         errorHandler.js with statusCode 404 and send a message that "Enter Your Valid Phone Number"
      */
if (validPhone) {
  return next(errorHandler(404, "Please Enter Your Own Phone Number"));
}

<div className="" style={{ textAlign: "center" }}>
  {/* */}

  <div className="flex">
    {/* */}

    <span className="cursor-pointer">
      <FaPhoneVolume className="text-[22px] mt-[18px] mr-3" />
    </span>

    <input
      type="number"
      name="phoneNumber"
      id="phoneNumber"
      placeholder="Your Phone Number"
      className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl w-[100%] mr-4
      responsive-login-form"
      value={Inputs.phoneNumber}
      onChange={change}
    />

    {/* */}
  </div>

  {Inputs.phoneNumber.length === 10 && !phoneVerified ? (
    <>
      {resendOTP ? (
        <button
          onClick={sendOTP}
          disabled={loading}
          className="bg-emerald-900 text-2xl font-semibold font-sans text-red-300 py-3 
                        rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-[30%] mx-auto mt-3
                        responsive-button"
        >
          {loading ? (
            <CgSpinner
              size={20}
              className="text-center mx-auto text-white animate-spin "
            />
          ) : (
            "Resend OTP"
          )}
        </button>
      ) : (
        <button
          onClick={sendOTP}
          disabled={loading}
          className="bg-emerald-900 text-2xl font-semibold font-sans text-red-300 py-3 
                        rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-[30%] mx-auto mt-3
                        responsive-button"
        >
          {loading ? (
            <CgSpinner
              size={20}
              className="text-center mx-auto text-white animate-spin "
            />
          ) : (
            "Verify Phone"
          )}
        </button>
      )}
    </>
  ) : (
    ""
  )}

  <div>
    {phoneVerified ? (
      <div
        className="bg-emerald-900 text-2xl font-semibold font-sans text-red-300 py-3 
                      rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-[30%] mx-auto mt-2
                      flex pl-4 responsive-button"
      >
        <TiTick className="text-3xl text-[#74f151]" />
        <h1 className="text-2xl font-sans font-semibold">Verified</h1>
      </div>
    ) : (
      ""
    )}
  </div>

  <div className=" p-4 font-sans font-semibold text-3xl text-center text-red-800">
    {error}
  </div>

  {/* */}
</div>;

/*******************************************************************************************************/
/***************************     2 : Creating Register Controller      *********************************/
/*******************************************************************************************************/

/* Creating a Controller function with name RegisterController which contains the logic to register a 
   new user ie. it will take all the details from the user in the /register (route) page such as their 
   name, email, password etc.  and stored it in our database collection.
*/

/* new: true => will actually return and it will save the new information of this updated user
           replacing the previous one ie. it will give us the updated information(profile). 
           If we don't add this then we will get the previous information for our response.
        */
//  { new: true }

/* */

/* When user's email and password match then we will signIn the user :
          To signIn a user we have to ----

         * create a token
         * destruct its password and other remaining-details separately and
         * set the cookie and send a response status of 200 and the remaining details of the 
           user in the json format.
      
    */

/* We know using JWT we can create token which helps us in security similar to salting.
       Creating a token by using sign method of json-web-token(JWT) on basis of the user's id and
       the json-web-token secret key we created in .env file and providing expiry date for the token.

       The token number will be generated when the signIn is successful.

    */
const token = JWT.sign({ id: validUser._id }, process.env.JWT_SECRET, {
  expiresIn: "1d",
});

/* 2. If the user's email-id exist in our database then we will create a token.

          We will create a token by using sign method of json-web-token(JWT) on basis of the user's id, 
          user's email and the secret_key and provide an expiry time for the token.

          We will create this secret_key by the combination of jwt-secret and user's password.
    
          We are passing this email and id of the user because with this email and id the JWT will 
          create a token that will contain this email and id and from this token we can extract the 
          email and the id.
    */

const tokens = JWT.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
  expiresIn: "1h",
});

/* Then we will destruct the password and the other details of the user separately from the 
       validUser._doc because we will not send the password of the user we will only send other details
       of the user. And we have to use ._doc because without it we cannot destruct the details. 
    */
const { password: pass, ...remainingUserDetails } = validUser._doc;

/* After destructing the password and the other details of the user separately we will set the cookie 
       with name "token" and its value will be the token we created using json-web-token and we will 
       set the httpOnly true so that no third party app can access our cookie ie.. to make our cookie more 
       secure and provide a time of 6-mins for the token to expire and we will send a response status of 200
       and the remaining details of the user in the json format to the frontend so that everyone can see it.    
    */
/* { expire: 360000 + Date.now() } or { maxAge: 360000 } */
res
  .cookie("token", token, { httpOnly: true, expire: 2160000 + Date.now() })
  .status(200)
  .json(remainingUserDetails);

/* If the email exists in our database then we will compared(match) the passwords.
       using bcryptjs compareSync() method. 
       ie. the password entered by the user and the registered password present in our database.    
    */
const validPassword = bcryptjs.compareSync(password, validUser.password);

// Remove last 3 characters of a string

var str = "1437203995000";
str = str.substring(0, str.length - 3);
// '1437203995'

// Remove last 3 digits of a number

var a = 1437203995000;
a = (a - (a % 1000)) / 1000;
// a = 1437203995

/* 3 ways to convert to string */

value.toString();
"" + value;
String(value);

/* The username should be connected not separated. So Inorder to get separated we need to:
              
           1st we will have to split the name with a space and 
           2nd we will join the name without a space and
           3rd we will convert them to lowercase 
           4th we will add some random numbers and letters at the end to make them unique and we will take
               only the last four digits of the generated string. 
*/
const newUser = new userModel({
  /* */

  username:
    req.body.name.split(" ").join("").toLowerCase() +
    Math.random().toString(36).slice(-4),

  /* */
});

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
  Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);


          /* Then we will set(ie. update) all the changes made by the user in the input fields using $set:{} 
           method set is going to check, If the data is being changed then it will change that particular 
           data otherwise it will ignore that data. 
           We need to specify all of the fields individually so that user cannot send another information 
           that is not in the form.
        */
           {
            $set: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              // email: req.body.email,
              // phoneNumber: req.body.phoneNumber,
              address: req.body.address,
              gender: req.body.gender,
              password: req.body.password,
              avatar: req.body.avatar,
            },
          },



             /* Finding all the user's orders in our database collection (ie. orders) by using find({}) 
       mongoose method.

            And we will populate two things. 

          1. the products and we donot want the photo so we will de-select it.
          2. and the buyer and from this buyer we want only name so passing name.

          * and we will sort the orders on the basis of its creation time so that the latest 
            orders get visible at the top.
    */

    const AllUsers = await userModel
    .find({})
    .sort({ createdAt: "-1" });


        /* If the email exists in our database then we will compared(match) the passwords.
       using bcryptjs compareSync() method. 
       ie. the password entered by the user and the registered password present in our database.    
    */
       const validPasswords = bcryptjs.compareSync(password, validUser.password);



   /* Using twilio to send otp to client */


   import twilio from "twilio";
const accountSID = process.env.TWILIO_ACCOUNT_SID;
const accountToken = process.env.TWILIO_ACCOUNT_TOKEN;
const accountMobileNumber = process.env.TWILIO_ACCOUNT_MOBILE_NUMBER;
const twilioClient = new twilio(accountSID, accountToken);

    await twilioClient.messages.create({
      body: `Your OTP is: ${newOTP}`,
      from: accountMobileNumber,
      to: phoneNumber,
    });


        /* When the ticket database is not empty.    
       ie. When we will successfully get all the Tickets from our database for a particular 
           user's id we will send a success response message and display all the tickets.  
           Else we will display that no tickets is available for that particluar user.    
    */

           if (allTickets.length !== 0) {
            /* */
      
            res.status(200).json(allTickets);
      
            /* */
          } else {
            res.status(200).send({
              success: true,
              message: "No Ticket Available",
            });
          }



             /* Finding all the Tickets of a particular user on basis of its id present in our database 
       by using mongoose find({}) method.
       And sorting the todo-list according to created time.
    */

    const allTickets = await ticketPaymentModel
    .find({ userId: req.params.id })
    .sort({ createdAt: -1 });




          /* Checking the current ticket numbers is a existing ticket numbers or not in our
         database using findOne() mongoose method on the basis of the ticket numbers we will
         received from the input field.
      */

         const existingTicket = await ticketPaymentModel.findOne({
          "ticketNumbers.tickets": ticketNumberFromInput,
        });
  
        /* If the ticket number already exists in our database ie. already sold then we will return
           an error by passing the middleware function errorHandler() that we created in
           errorHandler.js with statusCode 404 and send a error message.
        */
  
        if (existingTicket) {
          return next(
            errorHandler(
              404,
              "You have already bought this Ticket Number. Please choose another ticket number"
            )
          );
        }





           // const result = await axios.post(
              //   "http://localhost:8000/api/payment/bookPaymentVerification",
              //   {
              //     razorpay_payment_id: response.razorpay_payment_id,
              //     razorpay_order_id: response.razorpay_order_id,
              //     razorpay_signature: response.razorpay_signature,

              //     numberOfPayments: 1,
              //     amount,
              //     userId: SessionId,
              //     books: JSON.parse(localStorage.getItem("books")),
              //   }
              // );



                  {/* ************************************ */}
        {/* Contents of the pdf to be displayed. */}

        <div className="">
        {/* */}

        <div className="pdfContent">
          <div className="ml-[17px]" ref={componentRef}>
            {/* */}

            <div className="">
              <img
                src="/newImages/logo.png"
                alt="contactus"
                style={{ width: "110px", height: "110px" }}
                className="rounded-3xl text-center responsive-image"
              />

              <p className="text-4xl font-sans font-semibold text-[#69124A] mt-3 mb-3 responsive-heading">
                Your Receipt
              </p>

              <p className="text-[18px] mt-4 font-sans font-semibold">
                Date = {day}
              </p>
            </div>

            <div className="text-[16px] ml-[410px] mt-[-100px] mb-[50px] responsive-company-details">
              {/* */}

              <p className="mb-3 font-sans font-semibold">SKMT Trust</p>

              <p>
                <span className="font-sans font-semibold pb-8">
                  Contact Us: skmt-trust.com
                </span>

                <br />

                <span className="ml-[110px] font-sans font-semibold responsive-company-details1">
                  70863-67457
                </span>

                <br />

                <span className="ml-[110px] font-sans font-semibold responsive-company-details1">
                  skmttrust23@gmail.com
                </span>
              </p>

              <p className="italic font-sans font-semibold mt-4">
                Golaghat, (Assam) India 785621
              </p>

              {/* */}
            </div>

            <hr />

            <div className="mb-4 mt-4">
              {/* */}

              {billingUser?.map((billingUser, index) => {
                return (
                  /* */

                  <div key={index}>
                    {/* */}

                    <div className="grid gap-3 mt-4 mb-6 responsive-address-text">
                      {/* */}

                      <p className="text-[17px] font-sans font-semibold text-[#69124A] mt-4">
                        <span> Buyer Name </span>

                        <span className="text-[28px] mx-3 mt-[-8px]">
                          {" "}
                          →{" "}
                        </span>

                        <span className="uppercase">
                          {billingUser.firstName} {billingUser.lastName}
                        </span>
                      </p>

                      {billingUser.email ? (
                        <p className="text-[17px] font-sans font-semibold text-[#69124A] mt-4">
                          <span> Buyer Email </span>

                          <span className="text-[28px] mx-3 mt-[-8px]">
                            →
                          </span>

                          <span> {billingUser.email} </span>
                        </p>
                      ) : (
                        ""
                      )}

                      <p className="text-[17px] font-sans font-semibold text-[#69124A] mt-4">
                        <span> Buyer Phone </span>

                        <span className="text-[28px] mx-3 mt-[-8px]">
                          {" "}
                          →{" "}
                        </span>

                        <span> {billingUser.phone} </span>
                      </p>

                      <p className="text-[17px] font-sans font-semibold text-[#69124A] mt-4">
                        <span> Buyer Address </span>

                        <span className="text-[28px] mx-3 mt-[-8px]">
                          {" "}
                          →{" "}
                        </span>

                        <span className="mx-3 px-3">
                          {billingUser.streetAddress}, {billingUser.pincode}
                        </span>

                        <span>
                          {billingUser.city}, ({billingUser.state})
                        </span>
                      </p>

                      {/* */}
                    </div>

                    {/* */}
                  </div>
                );
              })}

              {tickets.length > 0
                ? tickets?.map((tickets, index) => {
                    return (
                      <div
                        className="font-sans text-[#69124A] mt-1 mr-7 responsive-row"
                        key={index}
                      >
                        <p className="text-[18px] font-sans font-semibold text-[#69124A] mt-4">
                          <span>Buyer Individual Coupon Numbers </span>

                          <span className="text-[28px] mx-3 mt-[-8px]">
                            →
                          </span>

                          {tickets.ticketNumbers.map(
                            (ticketNumbers, index) => {
                              return (
                                <span className="text-[18px] mx-6 font-sans font-semibold mb-3">
                                  {ticketNumbers.tickets.join("  ")}
                                </span>
                              );
                            }
                          )}
                        </p>
                      </div>
                    );
                  })
                : ""}

              {bookNumbers.length > 0
                ? bookNumbers?.map((books, index) => {
                    return (
                      <div
                        className="text-[17px] font-sans font-semibold text-[#69124A]"
                        key={index}
                      >
                        {/* */}

                        <h3 className="pb-3 text-[20px] text-center mt-[40px]">
                          ✸ Buyer book numbers along with the coupons numbers
                          ✸
                        </h3>

                        {/* Book Numbers */}

                        <p className="mr-[14px] my-[17px] ">
                          {/* */}

                          <span className="font-sans font-semibold text-4xl text-[#3C0319]">
                            Book numbers
                          </span>

                          <span className="text-[28px] mx-3 mt-[-8px]">
                            →
                          </span>

                          {books.bookNumbers.map((bookNumbers, index) => {
                            return (
                              <span className="font-mono mb-8">
                                <span
                                  className="text-[18px] font-sans font-semibold ml-4 mb-3"
                                  key={index}
                                >
                                  {bookNumbers.books.join("  ")}
                                </span>
                              </span>
                            );
                          })}

                          {/* */}
                        </p>

                        {/* Coupon numbers of the above book numbers */}

                        <p className="">
                          {/* */}

                          <span className="mt-4 font-sans font-semibold text-4xl text-[#3C0319]">
                            Coupon numbers of the above book numbers
                          </span>

                          <span className="text-[28px] mx-3 mt-3">→</span>

                          {books.ticketsOfTheBookNumbers.map(
                            (ticketNumbers, index) => {
                              return (
                                <div className="mt-3 font-sans font-semibold mb-8 ml-[-10px]">
                                  <p
                                    className="text-[16px] font-sans font-semibold px-2"
                                    key={index}
                                  >
                                    {ticketNumbers.tickets.join("  ")}
                                  </p>
                                </div>
                              );
                            }
                          )}

                          {/* */}
                        </p>

                        {/* */}
                      </div>
                    );
                  })
                : ""}

              {/* */}
            </div>

            <hr className="mb-4" />

            <div className="flex ml-[30px] pb-6">
              {/* */}

              <img
                src="/newImages/stamp1.jpg"
                alt="contactus"
                style={{ width: "100px", height: "100px" }}
                className="rounded-full mt-3 text-center responsive-image"
              />

              <p className="text-[23px] mt-[17px] font-bold font-sans ml-[10px]">
                Thank You <br />
                Regards
              </p>

              {/* */}
            </div>

            {/* */}
          </div>
        </div>

        {/* */}
      </div>



/* */

import { errorHandler } from "./errorHandler.js";

import userModel from "../Models/userModel.js";

import JWT from "jsonwebtoken";

/*******************************************************************************************************/
/******************************   1: Creating verifyToken     ******************************************/
/*******************************************************************************************************/

/* Creating a middleware for both general-user and admin ie. we have written some logic which will verify 
   the token of the user. If the token of the logging user is verified then we will give access to our 
   website. A token is generated when the user successfully signIn to the webpage.
*/

export const verifyToken = (req, res, next) => {
  /* */

  /*  We will get the token from the cookie and we directly cannot get any data from the cookie.
      So in-order to get any data from the cookie we need to install a package call cookie-parser in 
      the api side. 

      Getting the token from the cookie using cookie-parser. Inside the cookie we have provided the 
      name of the token as access_token so we will use access_token as the token name. 
  */

  const token = req.cookies.token;

  /* After we get the token we will verify it.

     If we don't get any token ie. if there is no token then we will just return an error by 
     passing the middleware function errorHandler() that we created in errorHandler.js with a 
     statusCode of 401 and message as "Unauthorised User" inside the next() function. 
  */

  if (!token) {
    /* */

    return next(errorHandler(401, "Unauthorised User"));

    /* */
  }

  /* If there is a token we will check(verify) the token is correct or not using json-web-token. */

  JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
    /* */

    /* If there is an error we will return an error by passing the middleware function errorHandler() 
       that we created in errorHandler.js with a statusCode of 403 and message as "Forbiddden" inside 
       the next() function. 
    */
    if (err) return next(errorHandler(403, "Forbidden"));

    /* If there is no error we will save the user to the request and send this user to the controller 
       to update the user. 
    */
    req.user = user;

    /* After saving the user we will go to the next function after this middleware and execute it. */
    next();

    /* */
  });

  /* */
};

/*******************************************************************************************************/
/******************************   2: Creating isAdmin     **********************************************/
/*******************************************************************************************************/

/* Creating a middleware for the admin access ie. we have written some logic which will check
   the user who is logging is a admin or a general user on the basis of role provided for admin we have 
   provided role as 1 and for general user role as 0.
*/

export const isAdmin = async (req, res, next) => {
  /* */

  try {
    /* */

    const user = await userModel.findById(req.user.id);

    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized User",
      });

      /* */
    } else {
      /* */

      /* When the user is admin we will call next() function so that further execution continues. */
      next();

      /* */
    }

    /* Catching the error and displaying it. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};



useEffect(() => {
  /* */

  /* With the help of setInterval() function we are decrementing the previous Value upto 0.
     ie.... --prevValue(means decrement) and we are decrementing for every 1000 miliseconds 
     (1 secs). 

     In useState there is a parameter called prevValue which holds the intial value of 
     the useState. We can pass this parameter in the useState() setter function which holds 
     the updated data of the useState. ie.. here setCount().
     setCount() holding the previous value(initial value) that is 2 and it will keep on 
     decrementing by 1 until 0 as we are decrementing the previous Value. 
     ie.... --prevValue(means decrement) and we are decrementing for every 1000 miliseconds 
     (1 secs). 
  */

  const interval = setInterval(() => {
    /* */

    setCount((prevValue) => --prevValue);

    /* */
  }, 1000);

  /* Checking the count when the value of count becomes 0 then we will redirect(navigate) the 
     user to the login page and simply return.
     To redirect(navigate) the user to its last location page we are passing an object in the 
     navigate function with name state and value as location.pathname. 
     The location.pathname will give access to the currentpath to the user when they login.
  */

  count === 0 &&
    navigate(`/${path}`, {
      state: location.pathname,
    });

  /* Clearing the time-interval stored in interval variable with the help of clearInterval() 
     function when count reaches to 0. 
  */

  return () => clearInterval(interval);

  /* */
}, [count, navigate, location, path]);
