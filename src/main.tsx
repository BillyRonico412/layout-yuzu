import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "flexlayout-react/style/light.css"
import "@radix-ui/themes/styles.css"
import "./index.css"
import { Theme } from "@radix-ui/themes"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Theme>
			<App />
		</Theme>
	</React.StrictMode>,
)
