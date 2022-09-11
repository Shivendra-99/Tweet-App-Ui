import React,{ useEffect, useState } from "react";
import ShowCard from "./ShowCard";
import { Container } from "react-bootstrap";
import axios from "axios";

function ViewMyTweet() {
  var name = JSON.parse(localStorage.getItem("data"));
  const [tweets, setTweet] = useState([]);
  useEffect((e) => {
    const fetchData = async () => {
      axios.get(`https://cors-everywhere.herokuapp.com/http://tweet-application.us-east-1.elasticbeanstalk.com/api/v1.0/tweets/${name.userId}`).then(response => {
        console.log(response);
        if (response.status === 200) {
          var data1 = response.data;
          localStorage.setItem("Mydata", JSON.stringify(data1));
          setTweet(data1);
        } else {
          window.alert("someting went wrong");
        }
      })
    }
    fetchData();
  }, [tweets])
  return (
    <>
      <Container style={{ marginTop: "50px" }}>
        {
          tweets.map((tweets, index) => {
            return <ShowCard key={tweets.tweetId} userid={name.userId} tweetId={tweets.tweetId} username={name.firstName + " " + name.lastName} twee={tweets.tweet} time={tweets.dateAndTimeOfTweet} like={tweets.like} comment={tweets.comment} index={index} setDel={true} />
          })
        }
      </Container>
    </>
  );
}
export default ViewMyTweet;
