import { Box, Container, Stack } from '@mui/material';
import Config from './Config';
import Clock from './Clock';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={lightTheme}> 
      <Box sx={{backgroundColor:"#FFFFFF", height: '100vh'}}>
        <Container sx={{ width: '100vw' }}>
          <Stack spacing={2}>
            <Config />
            {/* <Clock /> */}
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
