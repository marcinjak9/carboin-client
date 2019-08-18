import React from 'react'
import Card from './Card'
import Avatar from './Avatar';


const FeedItem = () => {
  return (
    <Card>
      <div className="header">
        <div className="left">
          <Avatar size={50} />
          <div className="name">
            <h2 className="title-name">Mike Rossi</h2>
            <p>Subtitle</p>
          </div>
        </div>

        <div className="right">
          share
        </div>

      </div>

      <div className="body">
        <b>Mike</b> has planted 1 🌲 decarbonizing <b>2</b> transactions
      </div>
    </Card>
  )
}

export default FeedItem
