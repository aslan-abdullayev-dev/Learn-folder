import "./shared/styles/globals.scss";

import { StrictMode } from 'react'
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";

import Router from "./Router.tsx";
import { store } from "./shared/store";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router}/>
    </Provider>
  </StrictMode>,
)
