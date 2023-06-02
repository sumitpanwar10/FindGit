import React, { useState, useEffect, useCallback } from 'react';
import { List, ListItem, ListItemText, Button, Box, Typography, ListItemIcon, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';
import { CodeSharp, ForkLeft } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
export default function Repos({ username }) {
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const theme = useTheme();
  const fetchRepositories = useCallback(() => {
    fetch(`https://api.github.com/users/${username}/repos?per_page=10&page=${currentPage}`)
      .then((response) => {
        const linkHeader = response.headers.get('link');

        if (linkHeader) {
          const totalPagesMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
          if (totalPagesMatch) {
            setTotalPages(parseInt(totalPagesMatch[1]));
          }
        }
        return response.json();
      })
      .then((data) => {
        setRepos(data);
        console.log()
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username, currentPage]);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);



  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Box sx={{ pt: 4 }}  >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 1,
        borderRadius: 1,
        justifyContent: 'space-around',
        alignItems: 'start',
        bgcolor: theme.palette.mode === 'dark' ? '#202020' : '#fff'
      }}>
        <Typography padding={2} fontSize={18} color={lightBlue[300]}>Publice Repositories: </Typography>
        <Box>
          <List >
            {repos.map((repo) => (
               <React.Fragment key={repo.id}>
              <ListItem key={repo.id} style={{ width:'100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems:'start'}}>
                <ListItemText primary={repo.full_name} secondary={repo.description} />
                <ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <ForkLeft />
                    </ListItemIcon>
                    <ListItemText primary={repo.forks_count} />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <CodeSharp />
                    </ListItemIcon>
                    <ListItemText primary={repo.forks_count} />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <RemoveRedEyeIcon />
                    </ListItemIcon>
                    <ListItemText primary={repo.forks_count} />
                    <Divider/>
                  </ListItem>
                  
                </ListItem>
                
              </ListItem>
              {repos.indexOf(repo) !== repos.length - 1 && (
         
          
           <>
             <Divider style={{ margin: '16px 0' }}/>
           </>)}
                </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
      <Box>
        <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </Button>
        <Button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </Button>
      </Box>
    </Box>
  );
}

