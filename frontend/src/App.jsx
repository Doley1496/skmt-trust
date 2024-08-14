/* */

/* Importing BrowserRouter, Routes, Route  from react-router-dom

   BrowserRouter will give access to the routes from anywhere outside this file.
   Routes will work like container where we can keep all our Route.
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle.jsx";

/* COMPONENTS : */
import Header from "./Components/All/Header.jsx";
import Footer from "./Components/All/Footer.jsx";

import Dropdown from "./Components/All/Dropdown.jsx";

import UserPrivateRoute from "./Components/All/UserPrivateRoute.jsx";
import AdminPrivateRoute from "./Components/All/AdminPrivateRoute.jsx";
import PrivateRoute from "./Components/All/PrivateRoute.jsx";
import VerificationPrivateRoute from "./Components/All/VerificationPrivateRoute.jsx";

/* ADMIN PAGES : */
import AdminDashboardPage from "./Pages/Admin/AdminDashboardPage.jsx";
import UsersPage from "./Pages/Admin/UsersPage.jsx";
import CreateServicePage from "./Pages/Admin/CreateServicePage.jsx";
import DisplayServicesPage from "./Pages/Admin/DisplayServicesPage.jsx";
import UpdateAndDeleteServicePage from "./Pages/Admin/UpdateAndDeleteServicePage.jsx";
import UserTicketsAndBooksPage from "./Pages/Admin/UserTicketsAndBooksPage.jsx";

/* ALL PAGES : */

import HomePage from "./Pages/All/HomePage.jsx";
import AboutPage from "./Pages/All/AboutPage.jsx";
import ServicePage from "./Pages/All/ServicePage.jsx";
// import ServicePage from "./Pages/All/ServicePageWithCreation.jsx";

import GalleryPage from "./Pages/All/GalleryPage.jsx";
import PhotoGalleryPage from "./Pages/All/PhotoGalleryPage.jsx";
import VideoGalleryPage from "./Pages/All/VideoGalleryPage.jsx";

import ContactPage from "./Pages/All/ContactPage.jsx";
import PrivacyPolicyPage from "./Pages/All/PrivacyPolicyPage.jsx";
import PageNotFoundPage from "./Pages/All/PageNotFoundPage.jsx";
import TermsAndConditionsPage from "./Pages/All/TermsAndConditionsPage.jsx";
import FaqPage from "./Pages/All/FaqPage.jsx";
import FishingCompetitionPage from "./Pages/All/FishingCompetitionPage.jsx";
import LotteryCompetitionPage from "./Pages/All/LotteryCompetitionPage.jsx";
import QuizCompetitionPage from "./Pages/All/QuizCompetitionPage.jsx";
import CompetitionsPage from "./Pages/All/CompetitionsPage.jsx";
import BuyingPage from "./Pages/All/BuyingPage.jsx";
import EmailSubscriptionSuccessPage from "./Pages/All/EmailSubscriptionSuccessPage.jsx";
import ComplaintSuccessPage from "./Pages/All/ComplaintSuccessPage.jsx";
import PaymentSuccessPage from "./Pages/All/PaymentSuccessPage.jsx";
import PaymentFailPage from "./Pages/All/PaymentFailPage.jsx";
import TicketBuyingPage from "./Pages/All/TicketBuyingPage.jsx";
import BookBuyingPage from "./Pages/All/BookBuyingPage.jsx";
import SingleServicePage from "./Pages/All/SingleServicePage.jsx";
import DusutimukhPage from "./Pages/All/DusutimukhPage.jsx";
import KamalaMiriPage from "./Pages/All/KamalaMiriPage.jsx";
import MembershipPage from "./Pages/All/MembershipPage.jsx";

import BookSummaryPage from "./Pages/All/BookSummaryPage.jsx";
import TicketSummaryPage from "./Pages/All/TicketSummaryPage.jsx";
import MembershipSummaryPage from "./Pages/All/MembershipSummaryPage.jsx";

/* SERVICE PAGES : */
import ExplorationPage from "./Pages/OurServices/ExploringPage.jsx";
import CottagePage from "./Pages/OurServices/CottagePage.jsx";
import BoatingPage from "./Pages/OurServices/BoatingPage.jsx";
import FishingPage from "./Pages/OurServices/FishingPage.jsx";

/* USER PAGES : */

import RegistrationPage from "./Pages/User/RegistrationPage.jsx";
import LoginPage from "./Pages/User/LoginPage.jsx";
import LoginWithOtpPage from "./Pages/User/LoginWithOtpPage.jsx";
import ProfilePage from "./Pages/User/ProfilePage.jsx";
import UserDashboardPage from "./Pages/User/UserDashboardPage.jsx";
import TicketsAndBooksPage from "./Pages/User/TicketsAndBooksPage.jsx";
import SendLinkPage from "./Pages/User/SendLinkPage.jsx";
import ResetPasswordPage from "./Pages/User/ResetPasswordPage.jsx";
import VerificationPage from "./Pages/User/VerificationPage.jsx";
import MainVerificationPage from "./Pages/User/MainVerificationPage.jsx";

import ErrorPage from "./Pages/User/ErrorPage.jsx";

/* *************************************************************************************** */

import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { jwtDecode } from "jwt-decode";

import {
  signOutUserSuccess,
  deleteAccessToken,
} from "./Redux/Actions/authActions.jsx";

export default function App() {
  /* */

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);

  const handleAutoLogOut = async () => {
    /* */

    try {
      /* */

      dispatch(signOutUserSuccess());

      dispatch(deleteAccessToken());

      localStorage.clear();

      alert("Your session is expired. Please login again!");

      toast.success("Successfully Logged Out");

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      console.log(error);

      /* */
    }

    /* */
  };

  /* ********************************************************************************** */
  /* ********************************** useEffect() hooks ***************************** */
  /* ********************************************************************************** */

  useEffect(() => {
    /* */

    if (token) {
      const { exp } = jwtDecode(token);

      const checkTokenValidity = () => {
        if (exp < Date.now() / 1000) {
          handleAutoLogOut();
        }
      };

      const interval = setInterval(checkTokenValidity, 3600000);

      return () => clearInterval(interval);
    }

    /* */
  }, [token]);

  const theme = {
    /* */

    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },

    media: {
      smallMobile: "500px",
      mobile: "768px",
      tab: "998px",
    },

    /* */
  };

  return (
    /* */

    <ThemeProvider theme={theme}>
      {/* */}

      <BrowserRouter>
        {/* */}

        <GlobalStyle />

        <Header />

        <Routes>
          {/* */}

          {/* With the help of element we will show the components we want to show for different 
              web pages for different routes.
          */}

          <Route path="/" element={<HomePage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/policy" element={<PrivacyPolicyPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/terms" element={<TermsAndConditionsPage />} />
          <Route path="/service" element={<ServicePage />} />

          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/photoGallery" element={<PhotoGalleryPage />} />
          <Route path="/videoGallery" element={<VideoGalleryPage />} />

          <Route path="/kamalaMiri" element={<KamalaMiriPage />} />
          <Route path="/dusutimukh" element={<DusutimukhPage />} />

          <Route path="/exploration" element={<ExplorationPage />} />
          <Route path="/cottage" element={<CottagePage />} />
          <Route path="/boating" element={<BoatingPage />} />
          <Route path="/fishing" element={<FishingPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/loginWithOTP" element={<LoginWithOtpPage />} />

          <Route path="/competitions" element={<CompetitionsPage />} />

          <Route
            path="/singleService/:serviceId"
            element={<SingleServicePage />}
          />

          <Route
            path="/fishingCompetition"
            element={<FishingCompetitionPage />}
          />

          <Route
            path="/lotteryCompetition"
            element={<LotteryCompetitionPage />}
          />

          <Route path="/quizCompetition" element={<QuizCompetitionPage />} />

          <Route path="/sendLink" element={<SendLinkPage />} />

          <Route
            path="/reset-password/:id/:token"
            element={<ResetPasswordPage />}
          />

          <Route
            path="/emailSubscription"
            element={<EmailSubscriptionSuccessPage />}
          />

          {/* Means when all the above routes is not found then show this route(PageNotFound) */}
          <Route path="*" element={<PageNotFoundPage />} />

          <Route path="/pageNotFound" element={<ErrorPage />} />

          {/* *********************************************************************** */}
          {/* ***********************  Private Route  ******************************* */}
          {/* *********************************************************************** */}

          <Route element={<PrivateRoute />}>
            {/* */}

            <Route path="/dropdown" element={<Dropdown />} />

            <Route path="/buyingPage" element={<BuyingPage />} />

            <Route path="/ticketBuying" element={<TicketBuyingPage />} />

            <Route path="/bookBuying" element={<BookBuyingPage />} />

            <Route path="/paymentSuccess" element={<PaymentSuccessPage />} />

            <Route path="/paymentFail" element={<PaymentFailPage />} />

            <Route
              path="/complaintSuccess"
              element={<ComplaintSuccessPage />}
            />

            <Route path="/bookSummaryPage" element={<BookSummaryPage />} />

            <Route path="/ticketSummaryPage" element={<TicketSummaryPage />} />

            <Route
              path="/membershipSummaryPage"
              element={<MembershipSummaryPage />}
            />

            <Route path="/membership" element={<MembershipPage />} />

            {/* */}
          </Route>

          <Route element={<VerificationPrivateRoute />}>
            {/* */}

            <Route
              path="/verification/:message/:statusCode"
              element={<VerificationPage />}
            />

            <Route
              path="/verify-email/:userId/:token/:email"
              element={<MainVerificationPage />}
            />

            {/* */}
          </Route>

          {/* *********************************************************************** */}
          {/* ***********************  User Private Route  ************************** */}
          {/* *********************************************************************** */}

          {/* Creating a protected route to make the user's Dashboard component a private route.
              In the UserPrivateRoute page we have written a condition that when the user is 
              signIn then only we will allow the user to access this route's. Otherwise we will 
              navigate the user to the signIn page.
          */}

          <Route path="/dashboard" element={<UserPrivateRoute />}>
            {/* */}

            <Route path="user" element={<UserDashboardPage />} />

            <Route path="user/profile" element={<ProfilePage />} />

            <Route
              path="user/ticketsAndBooks"
              element={<TicketsAndBooksPage />}
            />

            {/* */}
          </Route>

          {/* *********************************************************************** */}
          {/* ***********************  Admin Private Route  ************************* */}
          {/* *********************************************************************** */}

          {/* Creating a protected route to make the admin's Dashboard component a private route.
              In the AdminPrivateRoute page we have written a condition that when the user is 
              signIn and the signIn user is the admin then only we will allow the user to access 
              this route's. Otherwise we will navigate the user to the spinner page.
          */}

          <Route path="/dashboard" element={<AdminPrivateRoute />}>
            {/* */}

            <Route path="admin" element={<AdminDashboardPage />} />

            <Route path="admin/users" element={<UsersPage />} />

            <Route path="admin/users/:slug" element={<UsersPage />} />

            <Route
              path="admin/users/ticket/userTicket"
              element={<UserTicketsAndBooksPage />}
            />

            <Route
              path="admin/create-service"
              element={<CreateServicePage />}
            />

            <Route
              path="admin/display-services"
              element={<DisplayServicesPage />}
            />

            <Route
              path="admin/update-delete-service/:serviceId"
              element={<UpdateAndDeleteServicePage />}
            />

            {/* */}
          </Route>

          {/* */}
        </Routes>

        <Footer />

        {/* */}
      </BrowserRouter>

      {/* */}
    </ThemeProvider>

    /* */
  );
}
