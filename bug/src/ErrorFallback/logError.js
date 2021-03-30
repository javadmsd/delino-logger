import axios from "axios";

const logError = async (error, componentStack) => {
  try {
    const message = error.message ? error.message : "NULL";
    const stack = componentStack || "NULL";

    await axios({
      method: "post",
      url: "http://localhost:1371/error",
      data: {
        message,
        stack,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export default logError;
