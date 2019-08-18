import React from 'react'
import Card from './Card';
import Avatar from './Avatar';

const Leaderboard = () => {
  return (
    <Card>
      <div className="body">
        <h2 className="title-name">Leaderboard</h2>
        <Avatar size={60} />
        <Avatar size={60} />
        <Avatar size={60} />
        <Avatar size={60} />
        <Avatar size={60} />
      </div>
    </Card>
  )
}

export default Leaderboard
