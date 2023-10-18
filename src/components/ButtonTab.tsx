import { TabType } from "../utils"

interface ButtonTabProps {
	title: TabType
}

const ButtonTab = (props: ButtonTabProps) => {
	return (
		<button
			className="px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none text-sm font-medium rounded-md"
			onClick={() => console.log(props.title)}
		>
			{props.title}
		</button>
	)
}

export default ButtonTab
