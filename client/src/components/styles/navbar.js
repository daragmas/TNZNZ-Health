import styled from 'styled-components'
import { NavLink } from 'react-router-dom';

export const Nav = styled.nav`
    
    height: 90px;
    font-size: 1rem;
    /* position: sticky; */
    top: 0;
    z-index: +1;
    /* border-bottom: 1px solid black; */
    `
export const NavbarContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
    font-size: 1.8em;
    z-index: 1;
    padding: 0 24px;
`
export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 1000px) {
        display: block;
        position: absolute;
        top:0;
        right:0;
        transform: translate(-100%,60%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`
export const NavItem = styled.div`
    flex: 1;
    text-align: center;
`
// export const NavLogoContainer = styled.div`
//     width: 200px;
//     height: 200px;
// `
export const NavLogo = styled.img`
    
    width: 12em;
    margin-top: 5px;
    
`


export const NavLoginContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 3em;
    height: 90px;
    align-items:center;
    @media screen and (max-width: 1000px) {
        display:none;
    }
`;
export const NavLoginItem = styled(NavLink)`
    text-decoration: none;
    color:inherit;
`;
export const NavLogoutBtn = styled.button`
    border:none;
    cursor: pointer;
    background:transparent;
    font-size: 1em;
`

