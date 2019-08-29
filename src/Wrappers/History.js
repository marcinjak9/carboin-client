import React from "react";
import styled from "styled-components";
import { compose } from "redux";
import { connect } from "react-redux";
import firestoreConnect from "react-redux-firebase/lib/firestoreConnect";
import Container from "Components/Container";
import Hero from "Components/Hero";
import FeedItem from "Components/FeedItem";
import CarbonCounter from "../Components/CarbonCounter";

const Section = styled.div`
  background-color: #f2f2f2;
`;

const History = ({ feed, profile }) => {
  return (
    <>
      <Hero
        title="History of your decarbonization"
        subtitle="Here you can find all your donations and the status of the transactions"
      />
      <Section className="section">
        <Container>
          <h1 className="title is-primary">Today</h1>
          <div className="columns">
            <div className="column is-two-thirds">
              {feed &&
                feed
                  // .reverse()
                  .map(f => (
                    <FeedItem key={f.id} amount={f.amount} user={profile} />
                  ))}
            </div>
            <div className="column">
              <CarbonCounter />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default compose(
  connect(({ firestore, firebase }) => {
    return {
      feed: firestore.ordered.feed || [],
      auth: firebase.auth,
      profile: firebase.profile
    };
  }),
  firestoreConnect(props => [
    {
      collection: "feed",
      where: ["user", "==", props.auth.uid],
      orderBy: ["createdAt"]
    }
  ])
)(History);
