
import { Nav, NavbarContainer, NavItem, NavLogo, NavLoginContainer, NavLoginItem,NavLogoutBtn, MobileIcon } from "./styles/navbar";
import { FaBars } from 'react-icons/fa'
import { useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import {login} from '../redux/user'
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
const Navbar = ({ toggleSidebar }) => {
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()
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
          <NavItem>
            <NavLink style={{ color: 'inherit', textDecoration: 'none' }} to="/TNZNZ-Health/">TNZNZ Health</NavLink>
          </NavItem>
          <NavItem>
            <NavLoginContainer>
              {user.username ? (
                <>
                  <div>Welome, {user.username}</div>
                  <NavLogoutBtn
                    onClick={() => {
                      Cookies.remove("token");
                      dispatch(login({}));
                    }}
                  >
                    Logout
                  </NavLogoutBtn>
                  <NavLoginItem to="/TNZNZ-Health/profile">Profile</NavLoginItem>

                </>
              ) : (
                <>
                  <NavLoginItem to="/login">Login</NavLoginItem>
                    <NavLoginItem to="/TNZNZ-Health/register">Register</NavLoginItem>
                </>
              )}
            </NavLoginContainer>
          </NavItem>
        </NavbarContainer>
      </Nav>
    </>
  );


}

export default Navbar;
