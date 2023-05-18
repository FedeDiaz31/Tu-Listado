import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { createList, deleteList, editList } from "./redux/listReducer";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import EditListModal from "./components/modals/EditListModal";
import CreateListModal from "./components/modals/CreateListModal";

function Lists() {
  const lists = useSelector((state) => state.lists);
  const dispatch = useDispatch();
  const [modalIndex, setModalIndex] = React.useState(0);
  const [editModal, setEditModal] = React.useState(0);
  const [inputValue, setInputValue] = React.useState("");
  const [editInput, setEditInput] = React.useState("");
  const [selectList, setSelectList] = React.useState(null);
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const [typeList, setTypeList] = React.useState("shopping-list");

  function status(n) {
    const numerator = products.filter(
      (prod) => prod.idList === n && prod.isCheck === true
    );

    const denominator = products.filter((prod) => prod.idList === n);

    if (numerator.length === 0) {
      return "Vacia";
    }
    if (numerator.length < denominator.length) {
      return "Incompleta";
    }
    if (numerator.length === denominator.length) {
      return "Completa";
    }
  }

  function lengthList(n) {
    const numerator = products.filter(
      (prod) => prod.idList === n && prod.isCheck === true
    );

    const denominator = products.filter((prod) => prod.idList === n);

    return (
      <>
        {Number(numerator.length)}/{Number(denominator.length)}
      </>
    );
  }
  function getCurrentDate(separator = "/") {
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${date}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year}`;
  }
  const [date, setDate] = React.useState(getCurrentDate());

  const handleCreateList = () => {
    dispatch(
      createList({
        id: uuidv4(),
        name: inputValue,
        date: date,
        type: typeList,
      }),
      setModalIndex(0),
      setInputValue("")
    );
  };

  const handleShowEditModal = (list) => {
    setEditModal(1);
    setSelectList(list);
  };

  const handleEditList = () => {
    if (editInput.length > 0) {
      dispatch(
        editList({
          id: selectList.id,
          name: editInput,
          type: typeList,
        })
      );
    } else {
      dispatch(
        editList({
          id: selectList.id,
          name: selectList.name,
          type: typeList,
        })
      );
    }
    setEditModal(0);
    setEditInput("");
    setSelectList(null);
  };

  const handleCancelEditList = () => {
    return setEditModal(0), setEditInput(""), setSelectList(null);
  };

  const nameList = (name) => {
    return `${name.substring(0, 8)}...`;
  };

  return (
    <>
      <form className="form" onSubmit={(event) => event.preventDefault()}>
        {lists.length == 0 && (
          <div className="row d-flex introduction">
            <div className="d-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#ffc300"
                class="bi bi-house-check mb-2 me-3"
                viewBox="0 0 16 16"
              >
                <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708L7.293 1.5Z" />
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.707l.547.547 1.17-1.951a.5.5 0 1 1 .858.514Z" />
              </svg>

              <p>¡Bienvenido a Tu Listado! </p>
            </div>
            <p>
              Por el momento no tienes ninguna lista creada, aprieta el botón
              azul para comenzar...
            </p>
          </div>
        )}

        {lists.map((list, index) => (
          <div key={index} className="row List d-flex">
            <div className="col-9 d-flex list-data">
              <h5
                role="button"
                className="list-name"
                onClick={() => navigate(`/lista/${list.id}`)}
              >
                {list.name.length < 23
                  ? list.name.substring(0, 22)
                  : list.name.substring(0, 20) + "..."}
              </h5>
              <div className="d-flex data-elements">
                <div className="d-flex">
                  <h5 className="check-data-list">{lengthList(list.id)}</h5>
                  <p className="status-list">{status(list.id)}</p>
                </div>
                <p className="date-list">{list.date}</p>
              </div>
            </div>
            <div className="col-3  d-flex justify-content-end list-buttons">
              <button
                className="btn btn-light show-button list-button"
                onClick={() => navigate(`/lista/${list.id}`)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="black"
                  class="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
              </button>
              <button
                className="btn btn-primary list-button"
                onClick={() => handleShowEditModal(list)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </button>
              <button
                className="btn btn-danger delete-button list-button"
                onClick={() => dispatch(deleteList(list.id))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        <button
          className="btn btn-primary circle mt-5"
          onClick={() => setModalIndex(1)}
        >
          +
        </button>
        {modalIndex === 1 && (
          <CreateListModal
            inputValue={inputValue}
            setInputValue={setInputValue}
            typeList={typeList}
            setTypeList={setTypeList}
            setModalIndex={setModalIndex}
            handleCreateList={handleCreateList}
          />
        )}
        {editModal === 1 && (
          <EditListModal
            selectList={selectList}
            setTypeList={setTypeList}
            editInput={editInput}
            setEditInput={setEditInput}
            handleCancelEditList={handleCancelEditList}
            handleEditList={handleEditList}
          />
        )}
      </form>
    </>
  );
}

export default Lists;
