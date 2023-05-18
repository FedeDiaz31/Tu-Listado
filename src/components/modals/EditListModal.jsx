import Button from "react-bootstrap/Button";
function EditListModal({
  selectList,
  editInput,
  setEditInput,
  setTypeList,
  handleCancelEditList,
  handleEditList,
}) {
  return (
    <>
      <div className="modal-show ">
        <div className="d-flex justify-content-center align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            fill="rgb(48, 127, 201)"
            class="bi bi-house-check mt-2 me-3"
            viewBox="0 0 16 16"
          >
            <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708L7.293 1.5Z" />
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.707l.547.547 1.17-1.951a.5.5 0 1 1 .858.514Z" />
          </svg>
          <h4 className="mt-4">{selectList.name}</h4>
        </div>
        <div className="input-createList mb-3">
          <input
            type="text"
            name="newList"
            id="newList"
            placeholder="Agrega un nuevo nombre"
            className="form-control mt-2 ms-2 me-2"
            value={editInput}
            onChange={(event) => setEditInput(event.target.value)}
          />
        </div>
        {/* ////////////////// */}

        <fieldset className="d-flex align-items-center">
          <div className="form-check ms-5">
            <input
              type="radio"
              className="form-check-input ms-5 "
              value={"shopping-list"}
              name="select-type"
              id="shopping-list"
              onClick={(e) => setTypeList(e.target.value)}
            />
            <label htmlFor="shopping-list">Lista de compras</label>
          </div>
          <div className="form-check me-2 ms-5">
            <input
              type="radio"
              className="form-check-input"
              value={"simple-list"}
              name="select-type"
              onClick={(e) => setTypeList(e.target.value)}
              id="simple-list"
            />
            <label htmlFor="simple-list">Listado simple</label>
          </div>
        </fieldset>
        {/* /////////////////// */}
        <div className="flex modal-btn">
          <Button
            className="close-button btn-close m-1"
            variant="secondary"
            onClick={handleCancelEditList}
          ></Button>

          <Button
            className="create-button"
            variant="primary"
            onClick={handleEditList}
          >
            Editar
          </Button>
        </div>
      </div>
    </>
  );
}

export default EditListModal;
