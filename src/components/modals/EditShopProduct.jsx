import { editQuantity } from "../../redux/productReducer";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function EditShopProduct({ product, handleShowEditPriceModal }) {
  const dispatch = useDispatch();
  const [showEditPriceModal, setShowEditPriceModal] = useState(null);

  return (
    <>
      <div className=" editShopProduct pe-4">
        <div className="me-3 mt-1">
          <svg
            onClick={() => setShowEditPriceModal(true)}
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="green"
            class="bi bi-cash-coin mt-1 "
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

        <div className="me-2">
          <svg
            onClick={dispatch(
              editQuantity({ id: product.id, value: Number(1) })
            )}
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#0576C4"
            class="bi bi-plus-circle-fill "
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
          </svg>
        </div>
        <div className="ms-1">
          <svg
            className="edit-icon"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#F64B4B"
            class="bi bi-dash-circle-fill "
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default EditShopProduct;
