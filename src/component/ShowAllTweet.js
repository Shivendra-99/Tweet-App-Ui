import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ShowCard from "./ShowCard";
//import  {useLocation} from "react-router-dom";

function ShowAllTweet(props) {
    const [tweets, setTweet] = useState([]);
    useEffect((e) => {
        const fetchData = async () => {
            axios.get("https://cors-everywhere.herokuapp.com/http://tweet-application.us-east-1.elasticbeanstalk.com/api/v1.0/tweets/all").then(response => {
                console.log(response);
                if (response.status === 200) {
                    var data1 = response.data;
                    setTweet(data1);
                    localStorage.setItem("Alldata", JSON.stringify(data1));
                } else {
                    window.alert("someting went wrong");
                }
            })
        }
        fetchData();
    }, [props.value])

    return (
        <>
            <Container style={{ marginTop: "50px" }}>
                {
                    tweets.map((tweet, index) => {
                        return <ShowCard key={index} username={tweet.userName} twee={tweet.tweet} time={tweet.dateAndTimeOfTweet} like={tweet.like} comment={tweet.comment} index={index} setDel={false}/>
                    })
                }

            </Container>
           
        </>
    );
}
export default ShowAllTweet;