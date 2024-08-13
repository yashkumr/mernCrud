import slugify from "slugify";
import userModel from "../models/userModel.js";

//createuserController
export const createUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("hello");
     console.log(req.body);

    let productPictures = [];
    const { productPicture } = req.files;

    if (productPicture && productPicture.length > 0) {
      productPictures = productPicture.map((file) => {
        return { img: file.filename };
      });
    }

    //validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }

    //chech user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //save
    const user = await new userModel({
      name,
      slug: slugify(name),
      productPictures,
      email,
      password,
    }).save();

    res.status(200).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//getUserController
export const getUserController = async (req, res) => {
  try {
    const users = await userModel.find({});

    res.status(200).send({
      success: true,
      message: "All Users",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting  users",
      error,
    });
  }
};

//getSingleUserController
export const getSingleUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ slug: req.params.slug });
    console.log(user);

    res.status(200).send({
      success: true,
      message: "Error in getting single User",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "Error getting single user",
    });
  }
};

//updateUserController

export const updateUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let productPictures = [];
    const { productPicture } = req.files;

    if (productPicture && productPicture.length > 0) {
      productPictures = productPicture.map((file) => {
        return { img: file.filename };
      });
    }

    const users = await userModel.findByIdAndUpdate(
      req.params.pid,
      {
        name: name,
        slug: slugify(name),
        email: email,
        password: password,
        productPictures,
      },
      { new: true }
    );
    await users.save();
    res.status(201).send({
      success: true,
      message: "users Updated Successfully",
      users,
    });

  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "Error in user Updation",
      error,
    });
  }
};

//deleteUserController

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await userModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Porduct",
      error,
    });
  }
};
