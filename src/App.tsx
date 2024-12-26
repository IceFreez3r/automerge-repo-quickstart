import automergeLogo from "/automerge.png";
import "@picocss/pico/css/pico.min.css";
import "./App.css";
import { useState } from "react";

export interface Task {
  title: string;
  done: boolean;
}

export interface TaskList {
  tasks: Task[];
}

function App() {
  const [doc, setDoc] = useState<TaskList>({ tasks: [] });

  return (
    <>
      <header>
        <a href="https://automerge.org" target="_blank">
          <img src={automergeLogo} className="logo" alt="Automerge logo" />
        </a>
        <h1>Automerge Task List</h1>
      </header>

      <button
        type="button"
        onClick={() =>
          setDoc((d) => ({
            tasks: [
              {
                title: "",
                done: false,
              },
              ...d.tasks,
            ],
          }))
        }
      >
        <b>+</b> New task
      </button>

      <div id="task-list">
        {doc &&
          doc.tasks?.map(({ title, done }, index) => (
            <div className="task" key={index}>
              <input
                type="checkbox"
                checked={done}
                onChange={() =>
                  setDoc((d) => {
                    const newTasks = [...d.tasks];
                    newTasks[index] = { ...newTasks[index], done: !done };
                    return { tasks: newTasks };
                  })
                }
              />

              <input
                type="text"
                placeholder="What needs doing?"
                value={title || ""}
                onChange={(e) =>
                  setDoc((d) => {
                    const newTasks = [...d.tasks];
                    newTasks[index] = {
                      ...newTasks[index],
                      title: e.target.value,
                    };
                    return { tasks: newTasks };
                  })
                }
                style={done ? { textDecoration: "line-through" } : {}}
              />
            </div>
          ))}
      </div>

      <footer>
        <p className="read-the-docs">
          Powered by Automerge + Vite + React + TypeScript
        </p>
      </footer>
    </>
  );
}

export default App;
