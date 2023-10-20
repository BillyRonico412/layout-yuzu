import { CheckIcon } from "@radix-ui/react-icons"
import { Model } from "flexlayout-react"
import { useAtom } from "jotai"
import { useCallback, useMemo } from "react"
import { MenuType, TabType, getMenu, modelAtom, useActiveTabs } from "../utils"

interface ButtonTabProps {
	tab: TabType
	menutype: MenuType
}

const MenuTab = (props: ButtonTabProps) => {
	const [model, setModel] = useAtom(modelAtom)
	const activeTabs = useActiveTabs()
	const isActiveTab = useMemo(
		() => activeTabs.includes(props.tab),
		[activeTabs, props.tab],
	)
	const icon = useMemo(
		() => (isActiveTab ? <CheckIcon /> : <CheckIcon className="invisible" />),
		[isActiveTab],
	)
	const onClick = useCallback(() => {
		const modelFromJson = Model.fromJson(model)
		if (isActiveTab) {
		} else {
		}
		setModel(modelFromJson.toJson())
	}, [isActiveTab, model, props.tab, setModel])

	const Menu = useMemo(() => getMenu(props.menutype), [props.menutype])

	return (
		<Menu.Item onClick={onClick} className="flex items-center gap-x-4">
			{icon}
			{props.tab}
		</Menu.Item>
	)
}

export default MenuTab
