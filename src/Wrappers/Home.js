import React from "react";
import styled from "styled-components";
import { compose } from "redux";
import { connect } from "react-redux";
import firestoreConnect from "react-redux-firebase/lib/firestoreConnect";
import Container from "Components/Container";
import Hero from "Components/Hero";
import FeedItem from "Components/FeedItem";
import Leaderboard from "Components/Leaderboard";

const Section = styled.div`
  background-color: #f2f2f2;
`;

const Home = ({ feed }) => {
  return (
    <>
      <Hero
        title="Feed"
        subtitle="Here you can find a live feed of our decarbonizators"
      />
      <Section className="section">
        <Container>
          <h1 className="title is-primary">Today</h1>
          <div className="columns">
            <div className="column is-two-thirds">
              {feed &&
                feed
                  .reverse()
                  .map(f => (
                    <FeedItem key={f.id} amount={f.amount} user={f.user} />
                  ))}
            </div>
            <div className="column">
              <Leaderboard />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

const populates = [{ child: "user", root: "profile" }];

export default compose(
  connect(state => {
    return {
      feed: state.firestore.ordered.feed
        ? state.firestore.ordered.feed.map(f => ({
            ...f,
            user: state.firestore.data.profile[f.user] || null
          }))
        : [],
      auth: state.firebase.auth
    };
  }),
  firestoreConnect(() => [
    {
      collection: "feed",
      populates
    }
  ])
)(Home);
