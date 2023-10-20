import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { Button, DropdownMenu } from "@radix-ui/themes"
import { Layout, Model, TabNode } from "flexlayout-react"
import { useAtom } from "jotai"
import { useCallback } from "react"
import ContentTab from "./components/ContentTab"
import MenuTabs from "./components/DropdownTabs"
import MenuTab from "./components/MenuTab"
import { modelAtom, tabs, useActiveTabs } from "./utils"

const App = () => {
	const factory = useCallback((node: TabNode) => {
		const component = node.getComponent()
		if (!component) {
			return
		}
		return <ContentTab title={component} />
	}, [])
	const [model, setModel] = useAtom(modelAtom)
	const activeTabs = useActiveTabs()
	return (
		<div className="flex flex-col w-screen h-screen">
			<nav className="py-2 border-b px-4 flex items-center gap-x-2">
				<p className="text-xl font-bold">Yuzu</p>
				<div className="ml-auto flex items-center gap-x-2">
					<MenuTabs />
				</div>
			</nav>
			<div className="flex-grow relative w-full">
				<Layout
					model={Model.fromJson(model)}
					factory={factory}
					onRenderTabSet={(_, renderValues) => {
						renderValues.stickyButtons = [
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Button className="cursor-pointer bg-gray-100 text-gray-600">
										<DotsVerticalIcon />
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									{tabs
										.filter((tab) => !activeTabs.includes(tab))
										.map((tab) => (
											<MenuTab key={tab} tab={tab} menuType="dropdown" />
										))}
								</DropdownMenu.Content>
							</DropdownMenu.Root>,
						]
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
