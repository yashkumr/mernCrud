import express from "express"
import { createUserController, deleteUserController, getSingleUserController, getUserController, updateUserController } from "../controllers/userController.js";
import multer from "multer";
import shortid from "shortid";
import path from "path";
import { fileURLToPath  } from "url";

//ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), "uploads/"));
    },
    filename:function(req,file,cb){
        cb(null, shortid.generate() + "-" + file.originalname);
    },
})
const upload = multer({storage});

router.post("/create-user",upload.fields([{ name: "mainImage",maxCount: 1 }, { name: "productPicture" }]), createUserController),

// get user
router.get("/get-user", getUserController);

//single user
router.get("/single-user/:slug", getSingleUserController);

//update user
// router.put("/update-user/:pid",upload.array("userPicture"), getUserController);
router.put("/update-user/:pid",upload.fields([{ name: "mainImage",maxCount: 1 }, { name: "productPicture" }]), updateUserController),


//delete user
router.delete("/delete-user/:id", deleteUserController);




export default router;