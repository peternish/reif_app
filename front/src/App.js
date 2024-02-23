import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import '@fortawesome/fontawesome-free/css/all.css';
import { store } from "./store/store";
import { theme } from "./constants/theme";
import Layout from "./Layout/Layout";
import Dashboard from "./Dashboard/Dashboard";
import Setup from "./Setup/Setup";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider value={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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
    </Provider>
  );
}

export default App;
