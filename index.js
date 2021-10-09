//env variable
require("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";

//API
import Auth from "./API/Auth";

//database connection
import connectDB from "./database/connection";

const zomato = express();


zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());

//for application routes
//localhost:4000/auth/signup
zomato.use("/auth", Auth);

zomato.get("/", (req, res) => res.json({ message: "SetUp Success Yaay!!" }));

zomato.listen(5000, () => connectDB().then(() => console.log("Server is up and running"))

    .catch(() => console.log("DB connection failed!")));