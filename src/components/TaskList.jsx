import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { toggleComplete } from "../context/TaskContext.jsx";

function TaskList({ query }) {
	const { tasks, setTasks } = useContext(TaskContext);
	const filteredTasks = tasks.filter((task) =>
		task.title.toLowerCase().includes(query.toLowerCase()),
	);

	return (
		<ul>
			{filteredTasks.map((task) => (
				<li key={task.id}>
					<span
						style={{ textDecoration: task.completed ? "line-through" : "none" }}
					>
						{task.title}
					</span>
					<button
						data-testid={task.id}
						onClick={() => toggleComplete(task, setTasks)}
					>
						{task.completed ? "Undo" : "Complete"}
					</button>
				</li>
			))}
		</ul>
	);
}

export default TaskList;
