import React, { useState, useEffect } from 'react';
import './App.css';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('bolt-todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('bolt-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(), // Simple unique ID
        text: newTask.trim(),
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTask('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Relatask</h1>
        <p className="app-subtitle">Where Elegance Meets Efficiency.</p>
      </header>

      <main className="main-content">
        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="todo-input"
            aria-label="New task input"
          />
          <button type="submit" className="add-button">
            Add Task
          </button>
        </form>

        {todos.length === 0 ? (
          <div className="empty-state">
            <img
              src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Empty task list illustration"
              className="empty-state-image"
            />
            <p className="empty-state-text">
              Looks like your to-do list is empty!
              <br />
              Time to add some amazing tasks.
            </p>
          </div>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
                aria-live="polite"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="checkbox-input"
                    aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                  />
                  <span className="checkmark"></span>
                </label>
                <span className="todo-text">{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                  aria-label={`Delete "${todo.text}"`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="delete-icon"
                  >
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V4C7 3.44772 7.44772 3 8 3H16C16.5523 3 17 3.44772 17 4V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 5V6H15V5H9Z" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default App;
