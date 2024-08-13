import express from "express"
import cors from "cors"
import morgan from "morgan"
import bodyParser from "body-parser";
import colors from "colors"
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDb();


export const app = express();

app.use(express.static('uploads'));  
//ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));

//routing
app.use("/api/v1/auth", authRoutes);



app.use("/", (req,res)=>{
    res.send("Welcome");
});

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`.bgCyan.white);
});