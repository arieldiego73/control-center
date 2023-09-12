
import NavigationsStyle from "./NavigationsStyle.module.css"
import SideNav from "./SideNav"
import TopNav from "./TopNav"

export default function Navigations() {


    return (
        <div className={NavigationsStyle.navigationsContainer}>
            <div className={NavigationsStyle.sideNavMainContainer}>
                <SideNav />
            </div>
            <div className={NavigationsStyle.topNavMainContainer}>
                <TopNav />
            </div>
        </div>
    )
}

