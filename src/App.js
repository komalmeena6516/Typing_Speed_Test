import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./Styles/global";
import { useTheme } from "./Context/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebaseConfig";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
import {Routes, Route} from 'react-router-dom';

function App() {
  const { theme } = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <GlobalStyle />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
