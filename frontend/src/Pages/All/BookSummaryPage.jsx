/* */

import * as React from "react";

import Layout from "../../Components/All/Layout.jsx";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useLocation } from "react-router-dom";

import BookBillingForm from "../../Components/Checkout/BookBillingForm.jsx";
import BookSummary from "../../Components/Checkout/BookSummary.jsx";
import Stepper from "../../Components/Checkout/Stepper.jsx";

const steps = ["Login", "Billing Address", "Payment"];

export default function BookSummaryPage() {
  /* */

  const [completed, setCompleted] = React.useState({});

  const location = useLocation();

  const querySearch = new URLSearchParams(location.search);

  const currentStep = querySearch.get("step");

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  return (
    /* */

    <Layout title={"Books"}>
      <div className="mt-[60px] px-10 lg:px-20">
        <Box>
          {/* */}

          <Stepper />

          <div className="">
            {/* */}

            {allStepsCompleted() ? (
              /* */

              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
              </React.Fragment>
            ) : (
              /* */

              <React.Fragment>
                {/* */}

                <div className="text-2xl font-semibold font-sans mt-[40px]">
                  {currentStep == 3 ? <BookSummary /> : <BookBillingForm />}
                </div>

                {/* */}
              </React.Fragment>

              /* */
            )}

            {/* */}
          </div>

          {/* */}
        </Box>
      </div>
    </Layout>

    /* */
  );

  /* */
}
