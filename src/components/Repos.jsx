import React, { useState, useEffect, useCallback } from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
 export default function Repos({ username }) {
    const [repos, setRepos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

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
      <div>
        <List>
          {repos.map((repo) => (
            <ListItem key={repo.id}>
              <ListItemText primary={repo.full_name} secondary={repo.description} />
            </ListItem>
          ))}
        </List>
        
        <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </Button>
        <Button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </Button>
      </div>
    );
  }
  
 