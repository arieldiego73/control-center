import NavigationHandler from "./NavigationHandler"
import Test from "../components/test/test2"
export default function TestHandler(){
    return (
      <div style={{ flexDirection: "column", display: "flex", }}>
      <NavigationHandler/> 
      <Test />
    </div>
    )
}