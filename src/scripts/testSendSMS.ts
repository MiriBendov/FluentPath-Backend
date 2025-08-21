import { sendSMS } from "../utils/sendSMS";

const runTest = async () => {
  try {
    const to = "+972583296331";
    const message = "Testing Twilio SMS from your system";

    await sendSMS(to, message);

    console.log("The message was successfully sent!");
  } catch (error: any) {
    console.error("Error sending SMS: ", error.message || error);
  }
};

runTest();
