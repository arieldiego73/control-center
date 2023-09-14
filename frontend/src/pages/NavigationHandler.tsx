import Navigations from "../components/newNav/Navigations";
import { TopNavProps } from "../components/newNav/TopNav";

interface NavigationHandlerProps extends TopNavProps {
  // Additional props for NavigationHandler, if needed
}

export default function NavigationHandler({ pageTitle }: NavigationHandlerProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100%" }}>
      <Navigations pageTitle={pageTitle} /> {/* Pass the pageTitle prop here */}
    </div>
  );
}
