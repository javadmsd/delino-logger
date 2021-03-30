import React from "react";

const ErrorFallback = ({ resetErrorBoundary }) => (
  <div>
    <p>خطایی رخ داده است، تیم پشتیبانی به سرعت این مشکل را رفع خواهد کرد</p>
    <button type="button" onClick={resetErrorBoundary}>
      دوباره تلاش کنید
    </button>
  </div>
);

export default ErrorFallback;
