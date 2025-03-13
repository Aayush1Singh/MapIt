/* eslint-disable no-unused-vars */
import Homepage from "./pages/Homepage";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
// import { useState, useEffect } from "react";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
// import { useState } from "react";
function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage></Homepage>}></Route>
            <Route path="/" element={<Homepage></Homepage>}>
              {" "}
            </Route>
            <Route path="/pricing" element={<Pricing></Pricing>}></Route>
            <Route path="/home" element={<Homepage></Homepage>}>
              {" "}
            </Route>
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppLayout></AppLayout>
                </ProtectedRoute>
              }
            >
              <Route path="form" element={<Form></Form>}></Route>

              <Route index></Route>
              <Route path="cities" element={<CityList></CityList>}></Route>
              <Route path="cities/:id" element={<City></City>}></Route>
              <Route
                path="countries"
                element={<CountryList></CountryList>}
              ></Route>
              <Route path="temp" element={<p>temp</p>}></Route>
            </Route>

            <Route path="/product" element={<Product></Product>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
