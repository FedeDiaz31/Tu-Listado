import { useParams, Link, useNavigate } from "react-router-dom";
import React from "react";
import { v4 as uuidv4 } from "uuid";

import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  deleteProduct,
  checkProduct,
  editProduct,
} from "../redux/productReducer";

import { deleteList } from "../redux/listReducer";

function SimpleProductList({ list, products }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [inputValue, setInputValue] = React.useState("");

  const handleAddProduct = () => {
    if (inputValue.length > 0) {
      dispatch(
        addProduct({
          name: inputValue,
          idList: params.id,
          id: uuidv4(),
          isCheck: false,
          price: 0,
          quantity: 0,
        })
      );
      setInputValue("");
    }
  };

  const handleDeleteList = () => {
    dispatch(deleteList(params.id));
    navigate("/");
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div className="container">
        <div className="d-flex  justify-content-between">
          <p className="fw-bold text-light">Listado simple</p>
          <p className="text-light">{list.date}</p>
        </div>
        <div className="d-flex justify-content-between mb-2 text-light">
          <h3 style={{ color: "#FFC300" }}>{list.name}</h3>
        </div>
        <div className="data-product">
          <input
            type="text"
            placeholder="Agregar un nuevo item"
            className="form-control"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <div className="d-flex flex-row-reverse">
            <button
              className="addProduct btn btn-primary mt-2"
              onClick={handleAddProduct}
            >
              Agregar
            </button>
          </div>
        </div>
        <div className="mt-5">
          {products.map((product) => (
            <div
              className="d-flex justify-content-between mt-3 product-line"
              key={product.id}
            >
              <div className="d-flex check-input">
                <input
                  type="checkbox"
                  className="form-check-input me-3 ms-3 border border-primary"
                  name="check"
                  onClick={() => dispatch(checkProduct({ id: product.id }))}
                  checked={product.isCheck}
                  id="flexCheckDefault"
                />

                <p
                  className={`width-p fw-bold ${
                    product.isCheck ? "through-text" : ""
                  }`}
                >
                  {product.name}
                </p>
              </div>
              <div onClick={() => dispatch(deleteProduct(product.id))}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="gray"
                  class="bi bi-trash3-fill"
                  className="trash-icon me-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-end">
          <Link style={{ color: "#ffc300", fontWeight: "bold" }} to="/">
            Volver
          </Link>
          <button
            className="btn btn-danger delete-list"
            onClick={handleDeleteList}
          >
            Eliminar Lista
          </button>
        </div>
      </div>
    </form>
  );
}

export default SimpleProductList;
