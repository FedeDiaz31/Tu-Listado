import { useParams, Link, useNavigate } from "react-router-dom";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  deleteProduct,
  checkProduct,
  editPrice,
  editQuantity,
} from "../redux/productReducer";
import { deleteList } from "../redux/listReducer";
import AddPriceModal from "./modals/AddPriceModal";
import EditShopProduct from "./modals/EditShopProduct";

function ShopProductList({ list, products }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [inputValue, setInputValue] = React.useState("");
  const [quantity, setQuantity] = React.useState(null);
  const [price, setPrice] = React.useState(null);
  const [addPriceModal, setAddPriceModal] = React.useState(0);
  const [addPrice, setAddPrice] = React.useState(null);
  const [selectProduct, setSelectProduct] = React.useState(null);
  const [editProduct, setEditProduct] = React.useState(null);

  const handleAddProduct = () => {
    if (inputValue.length > 0) {
      dispatch(
        addProduct({
          name: inputValue,
          idList: params.id,
          id: uuidv4(),
          isCheck: false,
          quantity: Number(quantity),
          price: Number(price),
          edit: false,
        })
      );
    }
    setInputValue("");
    setQuantity("");
    setPrice("");
  };

  const handleDeleteList = () => {
    dispatch(deleteList(params.id));
    navigate("/");
  };

  const handleShowEditPriceModal = (product) => {
    setSelectProduct(product);
    setAddPriceModal(1);
  };

  const handleCloseEditPriceModal = () => {
    setSelectProduct(null);
    setAddPriceModal(0);
    setAddPrice(null);
  };

  const handleAddPrice = () => {
    dispatch(editPrice({ id: selectProduct.id, price: Number(addPrice) }));
    setSelectProduct(null);
    setAddPriceModal(0);
    setAddPrice(null);
  };

  const totalPrice = (products) => {
    let prices = 0;
    for (let product of products) {
      prices = prices + product.price;
    }

    return prices;
  };
  function showEditItemPrice(products) {
    for (let product of products) {
      if (product.price == 0) {
        return "incomplete";
      }
    }
  }
  const handleShowEditModal = (product) => {
    if (editProduct == null) {
      setEditProduct(product.id);
    } else setEditProduct(null);
  };

  const handleEditQuantity = (product, value) => {
    dispatch(editQuantity({ id: product.id, value: value }));
  };

  return (
    <>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="container main-cont">
          <div className="d-flex justify-content-between me-3">
            <p className="fw-bold text-light">Lista de compras</p>
            <p className=" text-light">{list.date}</p>
          </div>

          <div className="d-flex justify-content-between mb-2 text-light">
            <h3 style={{ color: "#FFC300" }}>{list.name}</h3>
          </div>
          <div className="d-flex align-items-end mt-4 mb-2 data-product">
            <input
              type="text"
              placeholder="Agregar un nuevo item"
              className="form-control"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <div className="quant-price">
              <label htmlFor="quantity" className="text-light fw-bold me-2">
                Cantidad
              </label>
              <input
                name="quantity"
                type="text"
                className="form-control data-product-quant"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
              <label htmlFor="price" className="text-light fw-bold ms-3 me-2">
                Precio
              </label>
              <input
                name="price"
                placeholder="$"
                type="text"
                className="form-control data-product-price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="addProduct btn btn-primary"
              onClick={handleAddProduct}
            >
              <span className="display-btn">Agregar</span>
            </button>
          </div>
          <div className="mt-5">
            {products.map((product) => (
              <>
                <div className="d-flex">
                  <div
                    className="d-flex justify-content-between mt-3 product-line"
                    key={product.id}
                  >
                    <div className="d-flex justify-content-between check-input ">
                      <div className="d-flex">
                        <input
                          type="checkbox"
                          className="form-check-input me-3 ms-3 border border-primary"
                          name="check"
                          onClick={() =>
                            dispatch(checkProduct({ id: product.id }))
                          }
                          checked={product.isCheck}
                          id="flexCheckDefault"
                        />

                        <p
                          onClick={() => handleShowEditModal(product)}
                          role="button"
                          className={`width-p fw-bold ${
                            product.isCheck ? "through-text" : ""
                          }`}
                        >
                          {product.name}
                        </p>
                      </div>
                      <div className="d-flex justify-content-start">
                        {product.quantity > 1 && (
                          <p className="quant">{product.quantity} unidades</p>
                        )}
                        {product.quantity === 1 && (
                          <p className="quant">{product.quantity} unidad</p>
                        )}

                        {product.price > 0 && (
                          <p className="price">por ${product.price}</p>
                        )}
                      </div>
                    </div>

                    <div className="d-flex align-items-end">
                      {product.price < 1 && (
                        <div>
                          <div
                            className="me-2 "
                            onClick={() => handleShowEditPriceModal(product)}
                          >
                            <svg
                              role="button"
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="green"
                              class="bi bi-cash-coin mt-1 cash-icon"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
                              />
                              <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                              <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                              <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      <div onClick={() => dispatch(deleteProduct(product.id))}>
                        <svg
                          role="button"
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
                  </div>
                  {/* //////////////Edit Product////////////// */}

                  {editProduct === product.id && (
                    <>
                      <div className=" editShopProduct ">
                        <svg
                          onClick={() => handleShowEditPriceModal(product)}
                          role="button"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="green"
                          class="bi bi-cash-coin mt-1 edit-icon"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
                          />
                          <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                          <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                          <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
                        </svg>

                        <svg
                          onClick={() => handleEditQuantity(product, Number(1))}
                          role="button"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#0576C4"
                          class="bi bi-plus-circle-fill edit-icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                        </svg>

                        <svg
                          onClick={() =>
                            handleEditQuantity(product, Number(-1))
                          }
                          role="button"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#F64B4B"
                          class="bi bi-dash-circle-fill edit-icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                        </svg>
                      </div>
                      <button
                        onClick={() => setEditProduct(null)}
                        className="btn-closeEditModal"
                      >
                        X
                      </button>
                    </>
                  )}
                  {/* ///////Edit Product////// */}
                </div>
              </>
            ))}
            <div className="d-flex ">
              {showEditItemPrice(products) != "incomplete" ? (
                <p
                  style={{
                    color: "#ffc300",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                >
                  {" "}
                  Precio Total ${totalPrice(products)}
                </p>
              ) : (
                <p className=" text-light mt-1">
                  Existen productos sin precio aprieta{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#2EE986  "
                    class="bi bi-cash-coin mt-1 me-1"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
                    />
                    <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                    <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                    <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
                  </svg>
                  para agregar
                </p>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end mb-5">
            <Link
              style={{
                color: "#ffc300",
                fontWeight: "bold",
              }}
              to="/"
            >
              Volver
            </Link>
            <button
              className="btn btn-danger delete-list"
              onClick={handleDeleteList}
            >
              Eliminar Lista
            </button>
          </div>

          {addPriceModal === 1 && (
            <AddPriceModal
              selectProduct={selectProduct}
              addPrice={addPrice}
              handleCloseEditPriceModal={handleCloseEditPriceModal}
              handleAddPrice={handleAddPrice}
              setAddPrice={setAddPrice}
            />
          )}
        </div>
      </form>
    </>
  );
}

export default ShopProductList;
