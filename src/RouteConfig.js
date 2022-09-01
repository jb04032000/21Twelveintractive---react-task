import React, { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { loader } from "./basic/helpers";
import HomePage from "./container/Pages/HomePage";
import Nopagefound from "./container/Pages/Nopagefound";
import PhotosPage from "./container/Pages/PhotosPage";

function RoueConfig() {
  return (
    <Suspense
      fallback={
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          {loader()}
        </div>
      }
    >
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="photos" element={<PhotosPage />} />

        <Route path="*" element={<Nopagefound />} />
      </Routes>
    </Suspense>
  );
}

export default RoueConfig;
