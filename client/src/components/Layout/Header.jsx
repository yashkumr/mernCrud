import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Header = () => {
  return (
    <>
     <Navbar expand="lg" className="bg-body-tertiary container-fluid mb-4" style={{background:"#262626"}}>
      <Container >
        <Navbar.Brand href="#" className='text-light ' >Corp </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1 " className='text-light fw-bold p-2 m-1'>Home</Nav.Link>
            <Nav.Link href="#action2" className='text-light fw-bold p-2 m-1'>About</Nav.Link>
            <Nav.Link href="#" disabled className='text-light fw-bold p-2 m-1'>
              Services
            </Nav.Link>
            <Nav.Link href="#" disabled className='text-light fw-bold p-2 m-1'>
              Contact Us
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="btn btn-primary ">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header