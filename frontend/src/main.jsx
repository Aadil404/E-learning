import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store";
import { Toaster } from "@/components/ui/sonner";
import LoadingSpinner from "./components/LoadingSpinner";
import { useLoadUserQuery } from "./features/api/authApi";

const Custom = (props) => {
  const { isLoading } = useLoadUserQuery();
  return <div>{isLoading ? <LoadingSpinner /> : props.children}</div>;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
        <App />
        <Toaster />
      </Custom>
    </Provider>
  </StrictMode>
);
