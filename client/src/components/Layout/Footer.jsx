import React from 'react'
import "../../assets/Footer.css"
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { AiTwotoneMail } from "react-icons/ai";

const Footer = () => {
  return (
   <>
   <div className="container-fluid ">
        <footer className="bg-dark text-white p-4">
          <div className="text-center text-md-left">
            <div className="row text-center text-md-left">
              <div className=" foot-content col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h5 className=" foot-heading text-uppercase mb-4  text-warning">
                   About Indicorp
                </h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Distinctio nostrum adipisci quod, fuga animi totam
                  dignissimos, accusantium ut voluptatum ex eius vel quaerat
                  iste eligendi quis ab aspernatur vitae numquam.
                </p>
              </div>
              <div className=" foot-content col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h5 className="text-uppercase mb-4 foot-heading text-warning">
                  Products
                </h5>
                <p>
                  <a href="#" className="text-white ">
                    About us
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white ">
                    The Provider
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white ">
                    Help & contact
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white ">
                    Blog
                  </a>
                </p>
              </div>
              <div className="foot-content col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h5 className="foot-heading text-uppercase mb-4 font-weight-bold text-warning ">
                  UseFul Links
                </h5>
                <p>
                  <a href="#" className="text-white ">
                    Terms & conditions
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white ">
                    privacy policy
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white ">
                    return policy
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white ">
                    The Provider
                  </a>
                </p>
              </div>
              <div className=" foot-content col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h5 className="foot-heading text-uppercase mb-4 font-weight-bold text-warning ">
                  Contacts
                </h5>
                <p className="p-2">
                  <IoHomeOutline />
                  &nbsp; New York, NY, 2333, US
                </p>
                <p>
                  <AiTwotoneMail />
                  &nbsp; Indicorp@gmail.com
                </p>
                <p>
                  <MdOutlineLocalPhone />
                  &nbsp; 91+ 9335140873
                </p>
                <p>
                  <IoHomeOutline />
                  &nbsp; +01 335 633 77
                </p>
              </div>
            </div>
          </div>
          <hr className="mb-4" />
          <div className=" row">
            <div className="foot-heading-copy col-md-12 text-center">
              CopyRight @2024 All right reserved by :
              <a href="#">
                <strong className="text-warning">Indicorp Solutions</strong>
              </a>
              <p></p>
            </div>
            {/* <div className="col-md-5 col-lg-4">
              <div className=" foot-icons text-md-right text-center">
                <ul className="list-unstyled list-inline">
                  <li className="list-inline-item">
                    <a href="#" className="btn-floating btn-sm text-white">
                      <FaFacebook />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="btn-floating btn-sm text-white">
                      <FaInstagram />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="btn-floating btn-sm text-white">
                      <FaLinkedin />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="btn-floating btn-sm text-white">
                      <FaWhatsapp />
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </footer>
      </div>
   </>

  )
}

export default Footer