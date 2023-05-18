function AddPriceModal({
  selectProduct,
  addPrice,
  handleCloseEditPriceModal,
  handleAddPrice,
  setAddPrice,
}) {
  return (
    <>
      <div className="addPrice-modal bg-light mb-3">
        <div className="   mb-3">
          <div className="d-flex justify-content-center align-items-baseline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              fill="rgb(35, 100, 38)"
              class="bi bi-house-check mt-2 me-3"
              viewBox="0 0 16 16"
            >
              <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708L7.293 1.5Z" />
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.707l.547.547 1.17-1.951a.5.5 0 1 1 .858.514Z" />
            </svg>

            <h4>{selectProduct.name}</h4>
          </div>
          <input
            type="number"
            name="newList"
            id="newList"
            placeholder="Agrega su precio"
            className="form-control input-addPrice"
            value={addPrice}
            onChange={(event) => setAddPrice(event.target.value)}
          />
        </div>
        <div className="flex modal-btn mb-2 me-2">
          <button
            className="close-button btn-close m-1"
            onClick={handleCloseEditPriceModal}
          ></button>
          <button
            className="btn btn-success create-button mt-0"
            onClick={handleAddPrice}
          >
            Añadir
          </button>
        </div>
      </div>
      ;
    </>
  );
}

export default AddPriceModal;
