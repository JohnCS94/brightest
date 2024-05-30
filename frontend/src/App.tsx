import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ToastContainer } from "react-toastify";

import UsageProvider from "./UsageContext";
import NewUsage from "./components/NewUsage";
import Results from "./components/Results";

import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";

const App = () => {
  document.documentElement.style.backgroundColor = "#f9fafc";
  return (
    <UsageProvider>
      <ToastContainer />
      <div>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Header />
          <NewUsage />
          <Results />
        </LocalizationProvider>
      </div>
    </UsageProvider>
  );
};

export default App;
