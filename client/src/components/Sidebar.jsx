import {
  SidebarWrapper,
  SidebarContainer,
  SidebarItem,
  SidebarItemText,
  Icon,
  CloseIcon,
} from "./styles/sidebar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../redux/user";
import Cookies from "js-cookie";
const Sidebar = ({isSidebarOpen,toggleSidebar}) => {
      const user = useSelector((state) => state.user.value);
      const dispatch = useDispatch();
      return (
        <>
          <SidebarWrapper isOpen={isSidebarOpen}>
            <Icon>
              <CloseIcon onClick={toggleSidebar} />
            </Icon>
            <SidebarContainer>
              {user.username ? (
                <>
                  <SidebarItem>
                    <button
                      onClick={() => {
                        Cookies.remove("token");
                        dispatch(login({}));
                      }}
                    >
                      Logout
                    </button>
                  </SidebarItem>
                </>
              ) : (
                <>
                  <SidebarItem>
                    <SidebarItemText onClick={toggleSidebar} to="/login">
                      Login
                    </SidebarItemText>
                  </SidebarItem>
                  <SidebarItem>
                    <SidebarItemText onClick={toggleSidebar} to="/register">
                      Register
                    </SidebarItemText>
                  </SidebarItem>
                </>
              )}
            </SidebarContainer>
          </SidebarWrapper>
        </>
      );
}

export default Sidebar;