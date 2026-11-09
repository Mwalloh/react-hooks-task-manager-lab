import React, { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();


export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:6001/tasks")
            .then((r) => r.json())
            .then((data) => setTasks(data));
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    );
}

export async function toggleComplete(task, setTasks) {
    try {
        const res = await fetch(`http://localhost:6001/tasks/${task.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: !task.completed }),
        });

        if (!res.ok) {
            throw new Error(`HTTP Error Status ${res.status}`);
        }

        const data = await res.json();
        return setTasks((prev) =>
            prev.map((task) => (task.id === data.id ? data : task)),
        );
    } catch (e) {
        console.log(e);
    }
}

export async function addTask(taskName, tasks, setTasks) {
    try {
        const res = await fetch("http://localhost:6001/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: taskName,
                completed: false,
            }),
        });

        if (!res.ok) {
            throw new Error(`HTTP Error status ${res.status}`)
        }

        const data = await res.json();
        return setTasks((prev) => [...prev, data]);
    } catch (e) {
        console.log(e);
    }
}