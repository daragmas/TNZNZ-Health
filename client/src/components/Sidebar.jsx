import {
  SidebarWrapper,
  SidebarContainer,
  SidebarItem,
  SidebarItemText,
  Icon,
  CloseIcon,
} from "./styles/sidebar";
const Sidebar = ({isSidebarOpen,toggleSidebar}) => {
      return (
        <>
          <SidebarWrapper isOpen={isSidebarOpen}>
            <Icon>
                <CloseIcon onClick={toggleSidebar}/>
            </Icon>
            <SidebarContainer>
              <SidebarItem>
                <SidebarItemText to="/login">Login</SidebarItemText>
              </SidebarItem>

              <SidebarItem>
                <SidebarItemText to="/register">Register</SidebarItemText>
              </SidebarItem>
            </SidebarContainer>
          </SidebarWrapper>
        </>
      );
}

export default Sidebar;