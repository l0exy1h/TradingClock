import { Container, Stack } from "@mui/material";
import Config from "./Config";
import Clock from "./Clock";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Container sx={{ width: "100vw" }}>
        <Stack spacing={2}>
          <Config />
          {/* <Clock /> */}
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
