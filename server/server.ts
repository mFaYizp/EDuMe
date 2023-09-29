import { app } from "./app";
require("dotenv").config();

//CREATE SERVER

app.listen(process.env.PORT, () =>
  console.log(`server is connected on Port ${process.env.PORT}`)
);
