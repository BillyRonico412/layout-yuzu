interface ContentTabProps {
	title: string
}

const ContentTab = (props: ContentTabProps) => {
	return (
		<div className="w-full h-full flex justify-center items-center text-6xl">
			{props.title}
		</div>
	)
}

export default ContentTab
