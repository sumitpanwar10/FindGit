import { Box, Divider } from '@mui/material'
import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlaceIcon from '@mui/icons-material/Place';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { lightBlue } from '@mui/material/colors';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function UserCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Box sx={{ pt: 4 }}>
      <Card sx={{  width: '300px', boxShadow: 1, bgcolor: theme.palette.mode === 'dark' ? '#141414' : '#fff' }} >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }} >
          <CardHeader

            title={
              <Typography>
                {props.name}
              </Typography>
            }
            subheader={props.username}

            sx={{ px: 6 }}
          />
          <CardMedia
            component="img"
            image={props.img}
            alt=""
            sx={{ p: 2, height: '200px', width: '200px' }}
          />
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.bio}
          </Typography>
          {props.location && (
              <Typography paragraph sx={{p:1}}><PlaceIcon /> {props.location}</Typography>
          )}
          
        </CardContent>
        <Divider />
        <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', px: 4 }}>
          <Typography sx={{color: lightBlue[400]}}>More</Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon sx={{color: lightBlue[400]}} />
          </ExpandMore >
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Following: {props.following}</Typography>
            <Typography paragraph>Followers: {props.followers}</Typography>
            <Typography paragraph>Repositories: {props.repo}</Typography>
          </CardContent>
        </Collapse>
      </Card>


    </Box>
  )
}
