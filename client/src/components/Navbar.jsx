
import { Nav, NavbarContainer, NavItem, NavLogo, NavLoginContainer, NavLoginItem, MobileIcon } from "./styles/navbar";
import { FaBars } from 'react-icons/fa'
const Navbar = ({ toggleSidebar }) => {
  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavItem>
            <NavLogo image={process.env.PUBLIC_URL + "/logo.png"} />
          </NavItem>
          <MobileIcon onClick={toggleSidebar}>
            <FaBars />
          </MobileIcon>
          <NavItem>TNZNZ Health</NavItem>
          <NavItem>
            <NavLoginContainer>
              <NavLoginItem to="/login">Login</NavLoginItem>
              <NavLoginItem to="/register">Register</NavLoginItem>
            </NavLoginContainer>
          </NavItem>
        </NavbarContainer>
      </Nav>
    </>
  );


}

export default Navbar;
