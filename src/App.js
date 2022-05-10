import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import axios from "axios";

import "./App.css";
import Events from "./Components/Events";
import NewEvents from "./Components/NewEvents";

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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

function App() {
  const [value, onChange] = useState(new Date());
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tile, setTile] = useState(true)

  const [main, setMain] = useState({
    title: "",
    subtitle: "",
    date:''
  });

  const modal = () => {
    openModal();
  };

  const handlechange = (e) => {
    setMain({ ...main, [e.target.name]: e.target.value });
    console.log(main);
  };

  const addEvent =async() => {
    await(axios.post("http://localhost:3003/events", main)
      .then((res) => console.log(res))
      .catch((err) => console.log(err)))
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="app">
    {/* <NewEvents date={value}/> */}
      <h1 className="text-center">React Calendar</h1>
      <div className="calendar-container">
        <Calendar onChange={onChange} onClickDay={modal} value={value} tileClassName={tile ? 'bg-warning' : 'bg-dark'}/>
      </div>
      <p className="text-center">
        <span className="bold">Selected Date:</span> {value.toDateString()}
      </p>

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
              value={main.title}
              onChange={handlechange}
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
              value={main.subtitle}
              onChange={handlechange}
            ></textarea>
            <input type="text" name="date" onMouseMove={handlechange} value={value} />
          </div>
          <button onClick={addEvent}>add event</button>
        </form>
      </Modal>
      <Events/>
    </div>
  );
}

export default App;
