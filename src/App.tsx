import { Container, Stack } from '@mui/material';
import Config from './Config';
import Clock from './Clock';

function App() {
  return (
    <Container sx={{ width: '100vw' }}>
      <Stack spacing={2}>
        <Config />
        <Clock />
      </Stack>
    </Container>
  );
}

export default App;
