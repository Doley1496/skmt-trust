/* */

export const otpVerification = async (otpTime) => {
  /* */

  try {
    /* */

    const currentDateTime = new Date();

    let differenceValue = (otpTime - currentDateTime.getTime()) / 1000;

    differenceValue /= 60;

    const minutes = Math.abs(differenceValue);

    if (minutes > 10) {
      return true;
    }

    return false;

    /* */
  } catch (error) {
    /* */

    console.log(error.message);

    /* */
  }

  /* */
};
