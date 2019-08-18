import 'isomorphic-fetch'
import React from 'react'
import styled from 'styled-components'
import Container from '../Components/Container'
import Hero from '../Components/Hero';
import FeedItem from '../Components/FeedItem';
import Leaderboard from '../Components/Leaderboard';

const Section = styled.div`
  background-color: #f2f2f2;
`

const Home = () => {
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
              <FeedItem />
              <FeedItem />
              <FeedItem />
              <FeedItem />
            </div>
            <div className="column">
              <Leaderboard />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Home
