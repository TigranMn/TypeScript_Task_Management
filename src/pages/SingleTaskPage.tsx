import React, { useContext, FC, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "./Layout";

export const SingleTaskPage: FC = () => {
	const { id } = useParams();
	const { handleSave, handleDelete, data } = useContext(Context);
	const task = data.find((el) => el.id === id) || null;

	const [currTitle, setTitle] = useState<string | undefined>(task?.title);
	const [currCategory, setCategory] = useState<string | undefined>(task?.category);
	const [currDescription, setDescription] = useState<string | undefined>(task?.description);
	const [isDeleted, setIsDeleted] = useState<Boolean>(false);
	const [isEditting, setIsEdditing] = useState<Boolean>(false);

	const onEditClick = () => {
		if (!isEditting) setIsEdditing(true);
		else {
			handleSave({
				id,
				description: currDescription,
				title: currTitle,
				category: currCategory,
				status: task?.status,
			});
			setIsEdditing(false);
		}
	};

	const whenEditting:JSX.Element = (
		<>
			<input
				onChange={(e) => {
					setTitle(e.target.value);
				}}
				type={"text"}
				defaultValue={currTitle}
			></input>
			<input
				onChange={(e) => {
					setCategory(e.target.value);
				}}
				type={"text"}
				defaultValue={currCategory}
			></input>
			<textarea
				onChange={(e) => {
					setDescription(e.target.value);
				}}
				defaultValue={currDescription}
			></textarea>
		</>
	);
	const notEditting:JSX.Element = (
		<>
			<h2>{currTitle}</h2>
			<h4>{currCategory}</h4>
			<p>{currDescription}</p>
		</>
	);

	return (
		<div className="singleTaskWrapper">
			{isDeleted ? (
				<div style={{ fontSize: "24px" }}>Deleted</div>
			) : (
				<div className="singleTaskBox">
					{isEditting ? whenEditting : notEditting}
					<button onClick={onEditClick} className="editBtn">
						{!isEditting ? "Edit" : "Save"}
						<i className="fa-regular fa-pen-to-square"></i>
					</button>
					<button
						onClick={() => {
							setIsDeleted(true);
							handleDelete(id);
						}}
						className="removeBtn"
					>
						{!isEditting ? "Remove" : "Close"}
						<i className="fa-solid fa-trash"></i>
					</button>
				</div>
			)}
		</div>
	);
}
