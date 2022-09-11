import React, { useState } from "react";
import { Container,Form,Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
function LoginForm() {
    const history=useNavigate();
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("");
    const handleInput=(e)=>{
       setEmail(e.target.value);
    }
    const handleIn=(e)=>{
        setPassword(e.target.value);
    }
    
    const LoginPage=async (e)=>{
        e.preventDefault();
      await fetch("/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email:email,
                password: password,
            })
        }).then((response)=>{
        const data=response.json();
        if(response.status===200 || data===null){
           data.then((val)=>{
                localStorage.setItem("data",JSON.stringify(val));
                toast.success("Login Successfully",{
                    position: "bottom-center"
                });
                history("/homePage");
            }); 

        }else{
            toast.error("Email Id or Password incorrect",{
                position: "bottom-center"
            });
            
        }
        }).catch((resp)=>{
            window.alert(resp,{
                position: "bottom-center"
            })
        });
        
    }
    return (
        <Container fluid>
            <Form>
                <Form.Group className="mb-3"  controlId="formBasicEmail">
                    <Form.Label className="text-white">Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleInput}  name="email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="text-white">Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={handleIn}  name="password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                   <Form.Check type="checkbox" label="Remember me" className="text-white"/>
                    
                </Form.Group>
                <Button variant="primary" type="submit" onClick={LoginPage}>
                    Login
                </Button>
            </Form>
        </Container>
    );
}
export default LoginForm;