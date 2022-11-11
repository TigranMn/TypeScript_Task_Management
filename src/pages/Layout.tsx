import { TaskContainer } from "../components/TaskContainer/TaskContainer";
import { createContext, FC, useContext } from "react";
import { Tasks } from "../API/api";

export type GlobalContent = {
	handleSave: (task: Tasks) => void;
	handleDelete: (id: string | undefined) => void;
	columns: string[];
	data: Tasks[]
}

export const Context = createContext<GlobalContent>({ handleSave: () => { }, handleDelete: () => {}, columns: [], data: [] });

export const Layout: FC = () => {

	const { columns, data, handleDelete } = useContext(Context)

	return (
		<div className="wrapper">
			{columns.map((column: string, i: number) => {
				return (
					<TaskContainer
						key={i}
						onDelete={handleDelete}
						status={column}
						data={data.filter((el: Tasks) => el.status === column)}
					/>
				);
			})}
		</div>
	);
}

