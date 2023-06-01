import React from 'react'

export default function UserCard(props) {
  return (
    <div>
        
        <h2>{props.username}</h2>
          <p>{props.name}</p>
          <p>{props.bio}</p>
          <p>{props.location}</p>
          <img src={props.img} alt="Profile" />
          <p>Followers: {props.followers}</p>
          <p>Following: {props.following}</p>
          <p>Public Repositories: {props.repo}</p>
    </div>
  )
}
