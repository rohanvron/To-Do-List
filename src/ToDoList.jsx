import React, { useState, useEffect, useRef } from "react";
import "./ToDoList.css";

function ToDoList() {

// declaraing statefull variables and setter function

    const [tasks, setTasks] = useState(["Take a Shower", "Go to the work"]);
    const [newTask, setNewTask] = useState("");
    const [selectedTask, setSelectedTask] = useState(null);

    const taskInputRef = useRef();
    const taskRef = useRef(null);
   
    // For Selecting and managing task from the keyboard 
    //(Delete, Up Arrow, Down Arrow)

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [selectedTask, tasks]);

    // For Deselecting the Task item by clicking somewhere else (blank Space)

    useEffect(() => {
        function handleMouseDown(event) {
            if (taskRef.current && !taskRef.current.contains(event.target)) {
                setSelectedTask(null);
            }
        }
        document.addEventListener('mousedown', handleMouseDown);
    
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, [selectedTask]);

    // Setter Functions

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {

        if(newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
            setSelectedTask(null);
        }

    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        setSelectedTask(null);
    }

    function taskMoveUp(index) {
        if (index > 0) {
        const updatedTasks = [...tasks];
        [updatedTasks[index], updatedTasks[index - 1]] = 
        [updatedTasks[index - 1], updatedTasks[index]];
        setTasks(updatedTasks);
        setSelectedTask(index - 1);
        }
    }

    function taskMoveDown(index) {
        if (index < tasks.length -1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
            setSelectedTask(index + 1);
        }
    }

    //(Delete, Up Arrow, Down Arrow)

    function handleKeyPress(event) {
        if (selectedTask !== null) {
            if (event.key === 'Delete') {
                deleteTask(selectedTask);
            } else if (event.key === 'ArrowUp') {
                taskMoveUp(selectedTask);
            } else if (event.key === 'ArrowDown') {
                taskMoveDown(selectedTask);
            }
        }
    }

    return(
        <div className="to-do-list">
            <h1 id="title">To Do List</h1>

            <div>
                <input 
                    type="text"
                    placeholder="Enter a Task..."
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyDown={(event) => {
                        if(event.key === "Enter") {
                            addTask();
                        }
                    }}
                    ref={taskInputRef}>
                </input>
                <button 
                    className="add-button"
                    onClick={addTask}>
                    Add
                </button>
            </div>
            <ol>
                {tasks.map((task, index) => 
                <li key={index} onClick={() => 
                        setSelectedTask(index)} ref={taskRef}
                        style={{border: selectedTask === index ? 
                        '2px solid white' : '2px solid rgba(128, 128, 128, 0.288)'}}>
                    <span className="text">{task}</span>
                    <button 
                        className="delete-button"
                        onClick={() => deleteTask(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </button>
                    <button 
                        className="move-up-button"
                        onClick={() => taskMoveUp(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                        </svg>
                    </button>
                    <button 
                        className="move-down-button"
                        onClick={() => taskMoveDown(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                        </svg>
                    </button>
                </li>
                )}
            </ol>

        </div>
    )
}

export default ToDoList