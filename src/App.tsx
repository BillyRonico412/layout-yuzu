import { Layout, Model, TabNode } from "flexlayout-react"
import "flexlayout-react/style/light.css"
import { useAtom } from "jotai"
import { useCallback } from "react"
import ButtonTab from "./components/ButtonTab"
import ContentTab from "./components/ContentTab"
import { modelAtom } from "./utils"

const App = () => {
	const factory = useCallback((node: TabNode) => {
		const component = node.getComponent()
		if (!component) {
			return
		}
		return <ContentTab title={component} />
	}, [])

	const [model, setModel] = useAtom(modelAtom)

	return (
		<div className="flex flex-col w-screen h-screen">
			<nav className="py-2 border-b px-4 flex items-center gap-x-2">
				<p className="text-xl font-bold">Yuzu</p>
				<div className="ml-auto flex items-center gap-x-2">
					<ButtonTab title="Layer" />
					<ButtonTab title="Configuration" />
					<ButtonTab title="Transformation" />
					<ButtonTab title="Cutplanes" />
					<ButtonTab title="Rendering" />
					<ButtonTab title="Info" />
					<ButtonTab title="Treeview" />
					<ButtonTab title="Multiview" />
					<ButtonTab title="Measure" />
					<ButtonTab title="Screenshot" />
				</div>
			</nav>
			<div className="flex-grow relative w-full">
				<Layout
					model={Model.fromJson(model)}
					factory={factory}
					font={{
						family: "Tilt Neon",
					}}
					onContextMenu={(e, node) => {
						console.log(e, node)
					}}
					onModelChange={(model) => {
						setModel(model.toJson())
					}}
				/>
			</div>
		</div>
	)
}

export default App
