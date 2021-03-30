import React from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "react-error-boundary";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorFallback from "./ErrorFallback";
import logError from "./ErrorFallback/logError";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, { componentStack }) => logError(error, componentStack)}
      onReset={() => {
        window.location.reload(false);
      }}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
