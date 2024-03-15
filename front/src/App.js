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
import LandingPage from "./LandingPage/LandingPage";
import Process from "./Process/Process";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider value={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={<Layout />}
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/setup" element={<Setup />} />
              <Route path="/process" element={<Process />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
