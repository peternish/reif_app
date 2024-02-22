import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { theme } from "./constants/theme";
import Layout from "./Layout/Layout";
import Dashboard from "./Dashboard.js/Dashboard";
import Setup from "./Setup/Setup";

function App() {
  return (
    <ThemeProvider value={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route index element={<Dashboard />} />
            <Route path="/setup" element={<Setup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
