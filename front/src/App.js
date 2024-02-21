import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { theme } from "./constants/theme";
import Layout from "./Layout/Layout";
import Dummy from "./Dummy";

function App() {
  return (
    <ThemeProvider value={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route index element={<Dummy />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
