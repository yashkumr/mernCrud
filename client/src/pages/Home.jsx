import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Input from "./UI/Input";
import Modal from "./UI/Modal";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../components/Layout/Layout.jsx";
import { Link, useNavigate } from "react-router-dom";
import "../assets/Custom.css";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [productPictures, setProductPictures] = useState([]);

  const [show, setShow] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();

  //getUser
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/get-user");
      setAllUsers(data.users);
      console.log(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  //createUser
  const submitForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("number", number);
    form.append("password", password);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    const { data } = axios.post("/api/v1/auth/create-user", form);
    setShow(false);
    console.log(form);
    navigate("/");

    if (data?.success) {
      toast.error(data?.message);
    } else {
      toast.success("User Created Successfully");
      navigate("/");
    }
  };
  const handleShow = () => setShow(true);

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  //deleteUser
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`/api/v1/auth/delete-user/${pId}`);

      if (data?.success) {
        toast.success("Users Deleted successfully");
        getAllUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm" className="crud-table">
        <thead>
          <tr style={{ fontSize: 15 }}>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th> Number</th>

            <th>Images</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="mb-3">
          {allUsers.length > 0
            ? allUsers.map((user, id) => (
                <tr key={user._id} className="pt-2" >
                  <td className="corp-data">{id + 1}</td>
                  <td className="corp-data">{user.name}</td>
                  <td className="corp-data">{user.email}</td>
                  <td className="corp-data">{user.number}</td>

                  <td className="corp-img">
                    <div style={{ display: "flex" }}>
                      {user.productPictures.map((picture) => (
                        <>
                          <div className="productImgContainer crud-table-img">
                            <img
                              src={`${import.meta.env.VITE_REACT_APP_MAIN_URL}${
                                picture.img
                              }`}
                              alt="images"
                            />
                          </div>
                        </>
                      ))}
                    </div>
                  </td>

                  <td>
                    <button className=" btn btn-warning m-1">
                      <Link key={user._id} to={`/update-user/${user.slug}`} style={{textDecoration:"none"}}>
                        Edit
                      </Link>
                    </button>
                    <button
                      className=" btn btn-danger"
                      onClick={() => {
                        handleDelete(user._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  //renderProducts
  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New User"}
        onSubmit={submitForm}
      >
        <Input
          label="Name"
          value={name}
          placeholder={`User`}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="email"
          type="email"
          value={email}
          placeholder={`email`}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="number"
          type="number"
          value={number}
          placeholder={`number`}
          onChange={(e) => setNumber(e.target.value)}
        />

        <Input
          label="Password"
          value={password}
          placeholder={`Password`}
          onChange={(e) => setPassword(e.target.value)}
        />

        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          multiple
          name="productPicture"
          className="mt-2"
          onChange={handleProductPictures}
        />
      </Modal>
    );
  };

  // const handleCloseProductDetailsModal = () => {
  //   setProductDetailModal(false);
  // };

  // const showProductDetailsModal = (product) => {
  //   setProductDetails(product);
  //   setProductDetailModal(true);
  // };
  // const renderProductDetailsModal = () => {
  //   if (!productDetails) {
  //     return null;
  //   }

  //   return (
  //     <Modal
  //       show={productDetailModal}
  //       handleClose={handleCloseProductDetailsModal}
  //       modalTitle={"Product Details"}
  //       size="lg"
  //     >
  //       <Row>
  //         <Col md="6">
  //           <label className="key">Name</label>
  //           <p className="value">{productDetails.name}</p>
  //         </Col>
  //         <Col md="6">
  //           <label className="key">Price</label>
  //           <p className="value">{productDetails.price}</p>
  //         </Col>
  //       </Row>
  //       <Row>
  //         <Col md="6">
  //           <label className="key">Quantity</label>
  //           <p className="value">{productDetails.quantity}</p>
  //         </Col>
  //         <Col md="6">
  //           <label className="key">Category</label>
  //           <p className="value">
  //             {productDetails && productDetails?.category?.name}
  //           </p>
  //         </Col>
  //       </Row>
  //       <Row>
  //         <Col md="12">
  //           <label className="key">Description</label>
  //           <p className="value">{productDetails.description}</p>
  //         </Col>
  //       </Row>
  //       <Row>
  //         <Col>
  //           <label className="key">Product Pictures</label>
  //           <div style={{ display: "flex" }}>
  //             {productDetails.productPictures.map((picture) => (
  //               <>
  //                 <div className="productImgContainer">
  //                   <img
  //                     src={`${import.meta.env.VITE_REACT_APP_MAIN_URL}${
  //                       picture.img
  //                     }`}
  //                     alt="images"
  //                   />
  //                 </div>
  //               </>
  //             ))}
  //           </div>
  //         </Col>
  //       </Row>
  //     </Modal>
  //   );
  // };

  return (
    <Layout>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between", margin:"10px" }}>
              <h4>All Products</h4>
              <button onClick={handleShow} className="btn btn-primary">
                Add
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {/* {renderProductDetailsModal()} */}
    </Layout>
  );
};

export default Home;
