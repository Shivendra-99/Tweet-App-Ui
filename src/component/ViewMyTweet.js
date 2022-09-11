import React from "react";
import ShowCard from "./ShowCard";
import { Container } from "react-bootstrap";
function ViewMyTweet() {
  var name = JSON.parse(localStorage.getItem("data"));
  return (
    <>
      <Container style={{marginTop: "50px"}}>
      {
        name.tweet.map((tweets,index) => {
                return  <ShowCard key={tweets.tweetId} userid={name.userId} tweetId={tweets.tweetId} username={name.firstName+" "+name.lastName} twee={tweets.tweet} time={tweets.dateAndTimeOfTweet} like={tweets.like} comment={tweets.comment} index={index} setDel={true} />
        })
      }
      </Container>
    </>
  );
}
export default ViewMyTweet;