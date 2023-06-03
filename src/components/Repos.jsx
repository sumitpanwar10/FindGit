import React, { useState, useEffect, useCallback } from 'react';
import { Button, Box, Typography, Divider } from '@mui/material';
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
    <Box sx={{
      pt: 4,
      width: '100%',
    }}  >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 1,
        borderRadius: 1,
        justifyContent: 'space-around',
        alignItems: 'start',
        bgcolor: theme.palette.mode === 'dark' ? '#202020' : '#fff'
      }}>
        <Typography sx={{ px: 6, pt: 4 }} fontSize={18} color={lightBlue[300]}>Publice Repositories: </Typography>
        <Box sx={{ width: '100%', p: 2 }}>
          {repos.map((repo) => (
            <React.Fragment key={repo.id}>
              <Box
                key={repo.id}
                sx={{

                  px: 4,
                  width: '100%',
                  display: 'flex',
                  flexDirection: ['column', 'row'],
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  gap:2,
                  py: 2,
                }}>
                <Box sx={{ width: ['100%','75%'], display: "flex", flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-start', }}>
                  <a href={repo.html_url} target='__blank'>
                  <Typography sx={{ width: "auto", wordBreak: 'break-all', textAlign: 'left', overflowX: 'auto' }} variant="subtitle1">{repo.full_name}</Typography>
                  <Typography sx={{ width: "auto", wordBreak: 'break-all', textAlign: 'left', pt: 2 }} variant="body2" color="text.secondary">{repo.description}</Typography>
                  </a>
                </Box>
                <Box sx={{ width: ['100%','25%'], display: 'flex', flexDirection: 'row', gap: 3, justifyContent: 'space-between', pt: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'space-around', alignItems: 'flex-start', alignContent: 'start' }}>
                    <ForkLeft />
                    <Typography>{repo.forks_count}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'space-around', alignItems: 'flex-start' }}>
                    <CodeSharp />
                    <Typography>{repo.language}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'space-around', alignItems: 'flex-start' }}>
                    <RemoveRedEyeIcon />
                    <Typography >{repo.watchers_count}</Typography>
                  </Box>
                </Box>
              </Box>
              {repos.indexOf(repo) !== repos.length - 1 && (
                <>
                  <Divider sx={{ width: "auto" }} />
                </>)}
            </React.Fragment>
          ))

          }

        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
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

