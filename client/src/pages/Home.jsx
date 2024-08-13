import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Input from "./UI/Input";
import Modal from "./UI/Modal";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../components/Layout/Layout.jsx";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
      // navigate("/dashboard/admin/products");
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
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Images</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.length > 0
            ? allUsers.map((user, id) => (
              
                <tr key={user._id}>
                  <td>{id + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td> 
                  <div style={{ display: "flex" }}>
              {user.productPictures.map((picture) => (
                <>
                  <div className="productImgContainer">
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
                  
                  {/* <td>
                    <div style={{ display: "flex" }}>
                      {product.productPictures.map((picture) => (
                        <div className="productImgContainer">
                          <img
                            src={`../../public/uploads/${picture.img}`}
                            alt="images"
                          />
                        </div>
                      ))}
                    </div>
                  </td> */}

                  <td>
                    {/* <button
                      onClick={() => showProductDetailsModal(product)}
                      className="p-1 btn btn-primary"
                    >
                      info
                    </button> */}
                    <button className="p-1 btn btn-warning m-1">
                      <Link
                        key={user._id}
                        to={`/update-user/${user.slug}`}
                      >
                        Edit
                      </Link>
                    </button>
                    <button
                      className="p-1 btn btn-danger"
                      onClick={() => {
                        handleDelete(user._id);
                      }}
                    >
                      del
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
        modalTitle={"Add New Product"}
        onSubmit={submitForm}
      >
        <Input
          label="Name"
          value={name}
          placeholder={`Product Name`}
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
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
