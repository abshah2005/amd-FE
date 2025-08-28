import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_51RZw0wC2esy5ycVXA0IRVWt5IaUHg5pb5ruGY4aOudbbxVhmyQGH7iIFekHUUB6FlLqIdHFgqgL9WlpKwP66NjFa00YkXl6p6G");
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </QueryClientProvider>
  </BrowserRouter>
);
