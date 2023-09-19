import NavigationHandler from "./NavigationHandler"
import Test from "../components/test/test2"
export default function TestHandler(){
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
      <NavigationHandler/> 
      <Test />
    </div>
    )
}