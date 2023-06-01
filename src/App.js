import React, {useState} from "react";
import Nav from "./components/Appbar";
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Home from "./components/Home";
function App() {
  const[darkMode, setDarkMode]=useState(false)

  const darkTheme = createTheme({
    palette: {
      mode: darkMode?'dark':'light',
    }
  });


  return (
    <ThemeProvider theme={darkTheme}>
      <Paper style={{ height: "250vh" }} >
        <div>
          <Nav check={darkMode} change={()=>setDarkMode(!darkMode)}/>
          <Home />
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
