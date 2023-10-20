import { CaretDownIcon } from "@radix-ui/react-icons"
import { Button, DropdownMenu } from "@radix-ui/themes"
import { tabs } from "../utils"
import MenuTab from "./MenuTab"

const MenuTabs = () => {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button variant="soft">
					Layout
					<CaretDownIcon />
				</Button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content>
				{tabs.map((tab) => (
					<MenuTab tab={tab} key={tab} menutype="dropdown" />
				))}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	)
}

export default MenuTabs
