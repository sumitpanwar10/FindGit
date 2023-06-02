import React, { useState } from 'react'
import { Button, Box, TextField, Typography, CircularProgress } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import UserCard from './UserCard';
import Repos from './Repos';

export default function Home() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
          setUser(null);
        } else {
          setUser(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError('An error occurred. Please try again.');
        setUser(null);
        setLoading(false);
      });
  };
  return (
    <div>
      <Box sx={{

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
        m: 1,
        mt: 4,
        textAlign: 'center',
      }} >
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            id="Username"
            label="GitHub Username"
            variant="outlined"
            onChange={handleUsernameChange}
            onKeyDown={handleKeyDown}
          />
          <Button varient="solid"

            onClick={handleSearch}
            sx={{
              bgcolor: '#0A1929', color: 'white', '&:hover': {
                bgcolor: '#73ccff',
              },

            }}>
            <SearchIcon fontSize='large' /></Button>
        </Box>
        
        <Box sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems: 'center',
          textAlign: 'center' // Add this property
        }}>
          {error && <p>{error}</p>}
          {user && (
            <Box sx={{
              display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems: 'start',
          textAlign: 'center',
          p:4,
          mx:2,
          width:'100%'
            }}>
                <UserCard 
                sx={{mx:'auto'}}
                  username={user.login}
                  name={user.name}
                  bio={user.bio}
                  location={user.location}
                  img={user.avatar_url}
                  followers={user.followers}
                  following={user.following}
                  repo={user.public_repos}
                />
              
              <Repos username={user.login} />
            </Box>
          )}
        </Box>


      </Box>
      {loading && <CircularProgress />}


    </div>
  )
}
