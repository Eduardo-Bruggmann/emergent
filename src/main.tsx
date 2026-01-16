import { render } from "preact"
import App from "@/ui/App"
import "@/style.css"

const root = document.getElementById("app")

if (!root) throw new Error("Root element #app not found")

render(<App />, root)
