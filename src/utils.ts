import { ContextMenu, DropdownMenu } from "@radix-ui/themes"
import {
	IJsonModel,
	IJsonRowNode,
	IJsonTabNode,
	IJsonTabSetNode,
} from "flexlayout-react"
import { useAtomValue } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const tabs = [
	"Layer",
	"Configuration",
	"Transformation",
	"Cutplanes",
	"Rendering",
	"Info",
	"Treeview",
	"Multiview",
	"Measure",
	"Screenshot",
] as const

export type TabType = typeof tabs[number]

export type MenuType = "context" | "dropdown"

export const getMenu = (menuType: MenuType) => {
	switch (menuType) {
		case "context":
			return ContextMenu
		case "dropdown":
			return DropdownMenu
	}
}

export const createTab = (title: TabType): IJsonTabNode => {
	return {
		id: title,
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

export const useActiveTabs = () => {
	const model = useAtomValue(modelAtom)
	const isJsonRowNode = (
		node: IJsonRowNode | IJsonTabSetNode | IJsonTabNode,
	): node is IJsonRowNode => {
		return node.type === "row"
	}
	const isJsonTabSetNode = (
		node: IJsonRowNode | IJsonTabSetNode | IJsonTabNode,
	): node is IJsonTabSetNode => {
		return node.type === "tabset"
	}
	const isJsonTabNode = (
		node: IJsonRowNode | IJsonTabSetNode | IJsonTabNode,
	): node is IJsonTabNode => {
		return node.type === "tab" && node.name !== undefined
	}
	const activeTabsRec = (
		node: IJsonRowNode | IJsonTabSetNode | IJsonTabNode,
	): string[] => {
		if (isJsonRowNode(node)) {
			return node.children.flatMap((child) => activeTabsRec(child))
		} else if (isJsonTabSetNode(node)) {
			return node.children.flatMap((child) => activeTabsRec(child))
		} else if (isJsonTabNode(node) && node.name) {
			return [node.name]
		} else {
			return []
		}
	}
	return activeTabsRec(model.layout) as TabType[]
}
