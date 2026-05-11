import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.rotes.jsx";

import { AuthProvider } from "./Features/auth/auth.context.jsx";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
