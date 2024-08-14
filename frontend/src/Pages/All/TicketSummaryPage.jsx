/* */

import * as React from "react";

import Layout from "../../Components/All/Layout.jsx";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useLocation } from "react-router-dom";

import TicketBillingForm from "../../Components/Checkout/TicketBillingForm.jsx";
import TicketSummary from "../../Components/Checkout/TicketSummary.jsx";
import Stepper from "../../Components/Checkout/Stepper.jsx";

const steps = ["Login", "Billing Address", "Payment"];

export default function TicketSummaryPage() {
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

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Layout title={"Coupon"}>
      <div className="mt-[60px] px-10 lg:px-20">
        <Box>
          {/* */}

          <Stepper />

          <div>
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
                  {currentStep == 3 ? <TicketSummary /> : <TicketBillingForm />}
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
