import { Layout, Model, TabNode } from "flexlayout-react"
import "flexlayout-react/style/light.css"
import { useAtom } from "jotai"
import { useCallback } from "react"
import ContentTab from "./components/ContentTab"
import MenuTabs from "./components/DropdownTabs"
import { modelAtom } from "./utils"
import { render } from "react-dom"
import { ContextMenu } from "@radix-ui/themes"

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
					<MenuTabs menuType="dropdown" />
				</div>
			</nav>
			<div className="flex-grow relative w-full">
				<Layout
					model={Model.fromJson(model)}
					factory={factory}
					onRenderTabSet={(node, renderValues) => {
						renderValues.headerContent = (
							<ContextMenu.Root>
								<ContextMenu.Trigger>
									<div className="flex items-center gap-x-2">
										{renderValues.headerContent}
										<MenuTabs />
									</div>
								</ContextMenu.Trigger>
							</ContextMenu.Root>
						)
					}}
					onContextMenu={(e, node) => {
						console.log(e, node)
					}}
					onModelChange={(model) => {
						console.log(model.toJson())
						setModel(model.toJson())
					}}
				/>
			</div>
		</div>
	)
}

export default App
