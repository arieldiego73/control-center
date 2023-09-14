import NavigationsStyle from "./NavigationsStyle.module.css";
import SideNav from "./SideNav";
import TopNav, { TopNavProps } from "./TopNav"; // Import the TopNavProps interface

export default function Navigations({ pageTitle }: TopNavProps) {
  return (
    <div className={NavigationsStyle.navigationsContainer}>
      <div className={NavigationsStyle.sideNavMainContainer}>
        <SideNav />
      </div>
      <div className={NavigationsStyle.topNavMainContainer}>
        <TopNav pageTitle={pageTitle} /> {/* Pass the pageTitle prop here */}
      </div>
    </div>
  );
}
