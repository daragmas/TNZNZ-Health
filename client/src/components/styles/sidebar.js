import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import { FaTimes } from "react-icons/fa";
export const SidebarWrapper = styled.div`
  background: #0d0d0d;
  color: #fff;
  font-size: 2em;
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  display: grid;
  align-items: center;
`;
export const Icon = styled.div`
      position: absolute;
     top: 1.2rem;
     right: 1.5rem;
     background: transparent;
     font-size: 2rem;
     cursor: pointer;
     outline: none;
`
export const CloseIcon = styled(FaTimes)`
  color: #fff;
`;
export const SidebarContainer = styled.ul`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: repeat(6,80px);
	/* text-align: center; */
	@media screen and (max-width: 480px) {
    	grid-template-rows: repeat(6,60px);
    }
`;
export const SidebarItem = styled.li`
  text-decoration: none;
  list-style-type: none;
`;
export const SidebarItemText = styled(NavLink)`
	text-decoration: none;
	color: inherit;
`