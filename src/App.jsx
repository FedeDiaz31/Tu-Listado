import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProductList from "./ProductList";

function App() {
  return (
    <div
      className="container g-0 "
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className="d-flex justify-content-center align-items-baseline hack-title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          fill="#ffc300"
          class="bi bi-house-check mb-2 me-3"
          viewBox="0 0 16 16"
        >
          <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708L7.293 1.5Z" />
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.707l.547.547 1.17-1.951a.5.5 0 1 1 .858.514Z" />
        </svg>
        <h5 className="hack-title">
          {"   "}
          Tu Listado !
        </h5>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lista/:id" element={<ProductList />} />
      </Routes>
    </div>
  );
}

export default App;
