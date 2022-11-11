import { FC, useState } from "react";
import { tasks, Tasks } from "./API/api";
import { NavLink, Route, Routes } from 'react-router-dom'
import { Layout, Context } from "./pages/Layout";
import "./App.css";
import { SingleTaskPage } from "./pages/SingleTaskPage";
import { Homepage } from "./pages/Homepage";

let uuid: number = 1

export const App: FC = () => {
	const [data, setData] = useState<Tasks[]>(tasks)
	const columns: string[] = ["done", "in progress", "blocked", "todo"];

	const handleDelete = (id: string | undefined) => {
		setData((prev: Tasks[]) => prev.filter((el) => el.id !== id));
	};

	const handleSave = (task: Tasks) => {
		const { description, title, category, status, id } = task
		if (id) {
			setData((prev: Tasks[]) => {
				return prev.map((el) => {
					if (el.id === id) {
						el.description = description || el.description;
						el.title = title || el.title;
						el.category = category || el.category;
						el.status = status || el.status;
					}
					return el;
				});
			});
		} else {
			setData((prev: Tasks[]) => {
				return [
					...prev,
					{
						id: ++uuid + '',
						description: description || "Nothing set",
						title: title || "Nothing set",
						category: category || "Nothing Set",
						status: status,
					},
				];
			});
		}
	};

	return (
		<>
			<nav>
				<NavLink
					to={"/Homepage"}
				>
					Homepage
				</NavLink>
				<NavLink
					to={"/boards"}
				>
					Boards
				</NavLink>
			</nav>
			<Context.Provider value={{ handleSave, columns, handleDelete, data }}>
				<Routes>
					<Route
						path="/boards"
						element={<Layout />}
					/>
					<Route path="/boards/:id" element={<SingleTaskPage />} />
					<Route index path="/homepage" element={<Homepage />} />
					<Route path="/" element={<Homepage />} />
				</Routes>
			</Context.Provider>
		</>
	);
}
