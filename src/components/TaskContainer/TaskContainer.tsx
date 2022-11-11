import React, { useState, FC } from "react";
import { Task } from "../Task/Task";
import "./css/TaskContainer.css";
import { Modal } from "../Modal/Modal";
import { Tasks } from "../../API/api";

type TaskContainerProps = {
	status: string;
	data: Tasks[];
	onDelete: (id: string | undefined) => void;
}

export const TaskContainer: FC<TaskContainerProps> = ({ status, data, onDelete }) => {

	const [isAdding, setIsAdding] = useState<Boolean>(false)
	const toggleAdding = () => {
		setIsAdding(!isAdding)
	}

	return (
		<>
			<div className="taskContainer">
				<h1>{status}</h1>
				<button onClick={toggleAdding}>
					Add
					<i className="fa-solid fa-plus"></i>
				</button>
				{data.map((el) => {
					return (
						<Task
							id={el.id}
							key={el.id}
							status={el.status}
							handleDelete={onDelete}
							description={el.description}
							title={el.title}
							category={el.category}
						/>
					);
				})}
			</div>
			{isAdding ?
				<Modal adding
					status={status}
					toggleEdit={toggleAdding} /> : null}
		</>

	);
}
