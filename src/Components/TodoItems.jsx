import { useState } from "react";
import "./CSS/TodoItems.css";
import tick from './Assets/tick.png';
import not_tick from './Assets/not_tick.png';
import cross from './Assets/cross.png';

const TodoItems = ({ no, display, text, setTodos }) => {
  // Local state for item display status
  const [itemDisplay, setItemDisplay] = useState(display);

  const toggle = () => {
    // Toggle the display state
    const newDisplay = itemDisplay === "" ? "line-through" : "";
    setItemDisplay(newDisplay);

    // Update the todos in localStorage
    const data = JSON.parse(localStorage.getItem("todos"));
    const updatedData = data.map(todo => 
      todo.no === no ? { ...todo, display: newDisplay } : todo
    );
    localStorage.setItem("todos", JSON.stringify(updatedData));
    
    // Update the todos state in parent component
    setTodos(updatedData);
  };

  const removeItem = () => {
    const data = JSON.parse(localStorage.getItem("todos"));
    const updatedData = data.filter(todo => todo.no !== no);
    localStorage.setItem("todos", JSON.stringify(updatedData));

    setTodos(updatedData);
  };

  return (
    <div className="todoitems">
      <div className="todoitems-container" onClick={toggle}>
        <img src={itemDisplay === "" ? not_tick : tick} alt="toggle" />
        <div className="todoitems-text" style={{ textDecoration: itemDisplay }}>
          {text}
        </div>
      </div>
      <img
        className="todoitems-cross-icon"
        src={cross}
        alt="delete"
        onClick={removeItem}
      />
    </div>
  );
};

export default TodoItems;
