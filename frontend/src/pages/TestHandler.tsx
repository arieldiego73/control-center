import NavigationHandler from "./NavigationHandler"
import Test from "../components/test/test2"
export default function TestHandler(){
    return (
      <div style={{ flexDirection: "column", display: "flex", height:"100%", width:"100%" }}>
      <NavigationHandler/> 
      <Test />
    </div>
    )
}