import React, { useState } from "react";
import logo from "./tweet.png"
import { Container, Row, Col,Card,Button,Form} from "react-bootstrap";
import SignUp from "./SignUp";
import LoginForm from "./LoginForm";


function HomePage() {
    const[showLoginForm,setLoginForm]=useState(false);
    const[showRegistrationForm,setRegistrationForm]=useState(true);
    return (
        <Container fluid style={{ padding: "0px", backgroundColor: "black" }}>
            <Row>
                <Col xs={6}>
                    <div>
                        <img draggable="false" src={logo} alt="loaded" style={{ width: "750px", height: "750px" }}></img>
                    </div>
                </Col>
                <Col xs={5}>
                    <h1 className="text-white" style={{fontWeight:"bold"}} >What's Happening now</h1>
                    <h3 className="text-white" style={{fontWeight: "bold",marginLeft: "10px"}}>Join Tweet App Today.</h3>
                    <Card style={{backgroundColor: "black",width: "500px", marginLeft: "20px"}}>
                    {
                       showLoginForm?<LoginForm/>:<SignUp/>
                    }
                    {
                      showRegistrationForm?<Form.Label><h6 className="text-white mt-4" >Already have an account ?<Button style={{marginLeft: "10px"}} onClick={()=>{setLoginForm(!showLoginForm); setRegistrationForm(!showRegistrationForm)}} varient="primary">Sign In</Button></h6></Form.Label>:
                      <Form.Label><h6 className="text-white mt-4" > You do not have an account ?<Button  onClick={()=>{setRegistrationForm(!showRegistrationForm); setLoginForm(!showLoginForm)}} varient="primary" style={{marginLeft: "10px"}}>Sign Up</Button></h6></Form.Label>
                    }
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
export default HomePage;