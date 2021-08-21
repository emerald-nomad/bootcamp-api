const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const { bootcamps } = require("./routes");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const main = async () => {
  let server;

  try {
    // Connect to DB
    await connectDB();

    const app = express();

    // Dev loggin mididleware
    if (process.env.NODE_ENV === "development") {
      app.use(morgan("dev"));
    }

    // Routes
    app.use("/api/v1/bootcamps", bootcamps);

    const PORT = process.env.PORT || 5000;

    server = app.listen(
      PORT,
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
          .yellow.bold
      )
    );
  } catch (error) {
    server.close();
    console.error(`Error: ${error.message}`.red);
  }
};

main();
