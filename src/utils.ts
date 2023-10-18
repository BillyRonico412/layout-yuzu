import { IJsonModel, IJsonTabNode } from "flexlayout-react"
import { atomWithStorage } from "jotai/utils"

export type TabType =
	| "Layer"
	| "Configuration"
	| "Transformation"
	| "Cutplanes"
	| "Rendering"
	| "Info"
	| "Treeview"
	| "Multiview"
	| "Measure"
	| "Screenshot"

const createTab = (title: TabType): IJsonTabNode => {
	return {
		type: "tab",
		name: title,
		component: title,
		className: "rounded px-2 font-medium",
	}
}

export const modelAtom = atomWithStorage<IJsonModel>("modelAtom", {
	global: {
		tabSetMinWidth: 300,
		enableEdgeDock: false,
	},
	borders: [],
	layout: {
		type: "row",
		children: [
			{
				type: "row",
				weight: 3,
				children: [
					{
						type: "tabset",
						children: [createTab("Layer"), createTab("Configuration")],
					},
					{
						type: "tabset",
						children: [createTab("Transformation"), createTab("Cutplanes")],
					},
				],
			},
			{
				type: "row",
				weight: 4,
				children: [
					{
						type: "tabset",
						weight: 4,
						enableDivide: false,
						enableTabStrip: false,
						enableDrag: false,
						enableDrop: false,
						children: [
							{
								type: "tab",
								name: "Rendering",
								component: "rendering",
							},
						],
					},
				],
			},
			{
				type: "row",
				weight: 3,
				children: [
					{
						type: "tabset",
						children: [createTab("Info")],
					},
					{
						type: "tabset",
						children: [createTab("Treeview"), createTab("Multiview")],
					},
				],
			},
		],
	},
})
