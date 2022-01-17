import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap'
import { GiftFill, HouseFill,PencilSquare, PersonBoundingBox } from 'react-bootstrap-icons';
import './css/NavBar.css'
export default function NavBarComponent(
  
){
return(

<Navbar collapseOnSelect  bg="dark" variant="dark"  expand="lg">
  <Container>
    <Navbar.Brand href="/"> <GiftFill/>{' '}Fund-Net App</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/"><HouseFill/> Dashboard</Nav.Link>
        <Nav.Link href="/account"><PersonBoundingBox/>  My Account</Nav.Link>
        <Nav.Link href="/#ExploreCampaigns"><PencilSquare/>  Explore Campaigns</Nav.Link>
      </Nav>
    </Navbar.Collapse>


  </Container>
  
</Navbar>

);
}

