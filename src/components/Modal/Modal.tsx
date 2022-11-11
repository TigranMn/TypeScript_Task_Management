import React, { useState, useContext, FC } from "react";
import { Context } from "../../pages/Layout";
import "./css/Modal.css";

type ModalProps = {
	id?: string;
	title?: string;
	description?: string;
	category?: string;
	status: string | undefined;
	toggleEdit: () => void;
	adding?: boolean;
}

export const Modal: FC<ModalProps> = ({
	id,
	title,
	description,
	category,
	status,
	toggleEdit,
	adding,
}) => {
	const [currTitle, setTitle] = useState<string | undefined>(title || undefined);
	const [currDescription, setDescription] = useState<string | undefined>(description || undefined);
	const [currCategory, setCategory] = useState<string | undefined>(category || undefined);
	const [currStatus, setStatus] = useState<string | undefined>(status || undefined);

	const { handleSave, columns } = useContext(Context);

	const handleConfirm = () => {
		toggleEdit();
		handleSave({
			id,
			description: currDescription,
			category: currCategory,
			status: currStatus,
			title: currTitle,
		});
	};

	const changeSelect = (e: any) => {
		setStatus(e.target.value);
	};

	return (
		<div className="modal">
			<div className="editBox">
				<h3>{adding ? "Add" : "Edit"}</h3>
				<input
					type={"text"}
					defaultValue={currTitle}
					placeholder="Enter a title"
					onChange={(e) => setTitle(e.target.value)}
				></input>
				<input
					type={"text"}
					defaultValue={currCategory}
					placeholder={"Enter a category"}
					onChange={(e) => setCategory(e.target.value)}
				></input>
				<textarea
					defaultValue={currDescription}
					placeholder="Enter a description"
					onChange={(e) => setDescription(e.target.value)}
				></textarea>
				<select
					defaultValue={currStatus}
					onChange={changeSelect}
					disabled={adding}
				>
					{columns.map((el, i) => (
						<option key={i} value={el}>
							{el}
						</option>
					))}
				</select>
				<div className="btnContainer">
					<button
						onClick={handleConfirm}
					>
						{adding ? "Add" : "Save"}
					</button>
					<button onClick={toggleEdit}>Close</button>
				</div>
			</div>
		</div>
	);
}
