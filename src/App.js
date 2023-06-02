import React, {useState} from "react";
import Nav from "./components/Appbar";
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Home from "./components/Home";
import { amber, deepOrange, grey, lightBlue } from "@mui/material/colors";
function App() {
  const[darkMode, setDarkMode]=useState(false)
  const mode = darkMode ? 'light' : 'dark';
  const darkTheme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: lightBlue,
            divider: lightBlue[300],
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
            background: {
              default:  lightBlue[50],
              paper:  lightBlue[50],
            },
          }
        : {
            // palette values for dark mode
            primary: lightBlue,
            divider: lightBlue[300],
            background: {
              default: '#212121',
              paper: '#0d0d0d',
            },
            text: {
              primary: '#fff',
              secondary: grey[500],
            },
          }),
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevated ='0' style={{ minHeight: "100vh", overflowX:'hidden' }} >
        <div>
          <Nav check={darkMode} change={()=>setDarkMode(!darkMode)}/>
          <Home />
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
