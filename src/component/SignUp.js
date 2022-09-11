import React, { useState } from "react";
import { Container, Form, Button, Col, InputGroup, Row, } from "react-bootstrap";
import  {useNavigate}  from  "react-router-dom";
function SignUp() {
    const history=useNavigate();
    const [validated, setValidated] = useState(false);
    const [firstName,setfirstNames]= useState("");
    const [lastName,setlastNames] =useState("");
    const [email,setEmails]= useState("");
    const [mobileNumber,setMobileNumbers]=useState("");
    const [password,setPasswords]=useState("");
    const [conPassword,setconPasswords]=useState("");
    const [dateOfBirth,setDobs]=useState("");
    const setfirstName = (e)=>{
        setfirstNames(e.target.value);
    }
    const setlastName = (e) =>{
        setlastNames(e.target.value);
    }
    const setEmail = (e) =>{
        setEmails(e.target.value);
    }
    const setMobileNumber = (e) =>{
        setMobileNumbers(e.target.value);
    }
    const setPassword = (e)=>{
        setPasswords(e.target.value);
    }
    const setconPassword = (e) => {
        setconPasswords(e.target.value);
    }
    const setDob = (e) =>{
        let date=e.target.value;
        date=date.substring(0,10);
        console.log(date);
        setDobs(date);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(mobileNumber.length);
        if(mobileNumber.length!==10){
            event.preventDefault();
            event.stopPropagation();
        }
        if(password!==conPassword){
            event.preventDefault();
            event.stopPropagation();
        }
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation()
        }else{
            fetch("https://cors-everywhere.herokuapp.com/http://tweet-application.us-east-1.elasticbeanstalk.com/api/v1.0/tweets/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    mobileNumber: mobileNumber,
                    dateOfBirth:dateOfBirth,
                    email:email,
                    password: password,
                })
            }).then((response)=>{
                const data=response.json();
                console.log(data);
                console.log(email+ " "+ firstName +" "+lastName +" "+mobileNumber +" "+password+" "+dateOfBirth);
                if(response.status===200){
                    window.alert("Registraion successfully");
                    setfirstNames("");
                    setlastNames("");
                    setEmails("");
                    setMobileNumbers("");
                    setPasswords("");
                    setconPasswords("");
                    history("/");
                }else{
                    window.alert("Registraion failed its may be email id already register or someting went wrong!");
                }
            }).catch((response)=>{
                console.log(response);
            })
        }
        setValidated(true);
    };

    return (
        <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01" style={{ width: "240px" }}>
                        <Form.Label className="text-white">First name</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                name="firstName"
                                value={firstName}
                                onChange={setfirstName}
                            />
                            <Form.Control.Feedback type="invalid">Please Enter Email id</Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02" style={{ width: "250px" }}>
                        <Form.Label className="text-white">Last name</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last name"
                                name="lastName"
                                value={lastName}
                                onChange={setlastName}
                            />
                            <Form.Control.Feedback type="invalid">Please Enter Last Name</Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername" style={{ width: "240px" }}>
                        <Form.Label className="text-white">Email Id</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email Id"
                                aria-describedby="inputGroupPrepend"
                                value={email}
                                onChange={setEmail}
                                required
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Please Enter valid email id
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label className="text-white">Mobile Number</Form.Label>
                        <Form.Control type="Number" placeholder="Mobile Number" value={mobileNumber} onChange={setMobileNumber} required />
                        <Form.Control.Feedback type="invalid">
                            Please Enter valid mobile number.
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group style={{ width: "480px" }}>
                    <Form.Label className="text-white" >Enter Date Of Birth</Form.Label>
                    <Form.Control type="date" placeholder="Please Enter Date Of Birth" value={dateOfBirth} onChange={setDob} required/>
                    <Form.Control.Feedback type="invalid">
                            Please Enter valid Date Of Birth.
                     </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3" style={{marginLeft: "2px"}}>
                    <Form.Group as={Row} md="3" controlId="validationCustom04">
                        <Form.Label className="text-white">Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={setPassword} required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Password.
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row} md="3" controlId="validationCustom05">
                        <Form.Label className="text-white">Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" value={conPassword} onChange={setconPassword} required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Password.
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Check className="text-white"
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Button type="submit">Submit form</Button>
            </Form>
        </Container>
    );
}
export default SignUp;
