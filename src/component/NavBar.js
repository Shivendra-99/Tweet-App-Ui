import React from "react";
import { Container, Navbar, Nav, Button, Form } from "react-bootstrap";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import twitter from "./twitter-pngrepo-com.png";
import {useNavigate} from "react-router-dom";
function NavBar() {
  const history=useNavigate();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}


  return (
    <>
      <Navbar fixed="top" bg="primary" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/homePage">
            <img src={twitter} alt="show" style={{ width: "30px", height: "25px", marginRight: "10px" }} />
            Tweet App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll>
              <Nav.Link href="/homePage">Home</Nav.Link>
              <Nav.Link href="/viewMyTweet">My Tweet</Nav.Link>
            </Nav>
            <SearchUser/>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              onClick={()=>{
                if(window.confirm("Do you want to sign out?")){
                  localStorage.clear();
                   history("/");
                }else{

                }
                
              }}
              >
                <Avatar {...stringAvatar(JSON.parse(localStorage.getItem("data")).firstName+" "+JSON.parse(localStorage.getItem("data")).lastName )} style={{ marginLeft: "10px" }} /> 
            </StyledBadge>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default NavBar;
