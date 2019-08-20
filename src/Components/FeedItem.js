import React from 'react'
import Card from './Card'
import Avatar from './Avatar';


const FeedItem = ({
  amount,
  displayName,

}) => {
  return (
    <Card>
      <div className="header">
        <div className="left">
          <Avatar size={50} />
          <div className="name">
            <h2 className="title-name">{displayName}</h2>
            <p>Subtitle</p>
          </div>
        </div>

        <div className="right">
          share
        </div>

      </div>

      <div className="body">
        <b>{displayName}</b> has planted {amount} 🌲 decarbonizing <b>{amount / 2}</b> transactions
      </div>
    </Card>
  )
}

export default FeedItem
