import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const Events = () => {
  const [state, setState] = useState([]);
  const [editEvent, setEditEvent] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const modal = () => {
    openModal();
  };

  useEffect(() => {
    axios
      .get("http://localhost:3003/events")
      .then((res) => setState(res.data.reverse()));
  });

  const editUser = async (id) => {
    await axios.get(`http://localhost:3003/events/${id}`).then((res) => {
      setEditEvent(res.data);
    });
    console.log(editEvent);
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="container">
      {state.map((ele, i) => {
        return (
          <div key={i}>
            <p>{ele.title}</p>
            <p>{ele.date}</p>
            <button onClick={() => editUser(ele.id)}>
              Edit
            </button>
          </div>
        );
      })}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Hello</h2>
        <button onClick={closeModal}>close</button>
        <form>
          <div className="form-control">
            <label htmlFor="" className="form-label">
              title
            </label>
            <input
              type="text"
              className="form-input"
              name="title"
              // value={editEvent. title}
              //   onChange={handlechange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="" className="form-label">
              subtitle
            </label>
            <textarea
              name="subtitle"
              id=""
              cols="30"
              rows="10"
              className="form-input"
              //   value={subtitle}
              //   onChange={handlechange}
            ></textarea>
            <input type="text" name="date" />
          </div>
          <button>add event</button>
        </form>
      </Modal>
    </div>
  );
};

export default Events;
