import React, { useState, FC } from "react";
import "./css/Task.css"
import { Modal } from "../Modal/Modal";
import { NavLink } from "react-router-dom";

type TaskProps = {
	id: string | undefined;
	title: string | undefined;
	description: string | undefined;
	category: string | undefined;
	status: string | undefined;
	handleDelete: (id: string | undefined) => void
}

export const Task: FC<TaskProps> = ({ id, title, description, category, status, handleDelete }) => {
	const [onEdit, setOnEdit] = useState(false)

	const toggleEdit = () => {
		setOnEdit(!onEdit)
	}

	return (
		<div className="taskBox">
			<NavLink to={`/boards/${id}`}>
				<h2>{title}</h2>
			</NavLink>
			<h4>{category}</h4>
			<p>{description}</p>
			<button className="editBtn"
				onClick={toggleEdit}>
				Edit
				<i className="fa-regular fa-pen-to-square"></i>
			</button>
			<button
				className="removeBtn"
				onClick={(event: any) => handleDelete(id)}>
				Remove
				<i className="fa-solid fa-trash"></i>
			</button>
			{onEdit ?
				<Modal title={title}
					id={id}
					toggleEdit={toggleEdit}
					description={description}
					category={category}
					status={status}
					adding={false} />
				: null}
		</div>
	)
}
