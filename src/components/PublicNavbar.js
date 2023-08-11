import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const PublicNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="position-fixed navbar-fixed">
      <Navbar.Brand>
        {/* <img src={logo} alt="CoderSchool" width="200px" /> */}
      </Navbar.Brand>
      <Nav className="mr-auto"></Nav>
      <Nav>
        <a
          href="https://github.com/dhminh1024/cs_weather_app"
          target="_blank"
          rel="noreferrer"
        >
          {/* <img src={githubIco} alt="Github" width="32px" /> */}
        </a>
      </Nav>
    </Navbar>
  );
};

export default PublicNavbar;
