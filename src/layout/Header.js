import React from "react";
import { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Button,
} from "reactstrap";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [searchValue, setSearchValue] = useState('');
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  return (
    <Navbar className="p-1" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand className="d-lg-none">
          {/* <LogoWhite /> */}
        </NavbarBrand>
        <Button
          color=""
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
    </Navbar>
  );
};

export default Header;
