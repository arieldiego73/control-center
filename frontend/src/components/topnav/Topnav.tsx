import Logo from "../../Assets/logo (white).png";
import User from "../../Assets/userImage.png";
import TopnavStyle from "./Topnav.module.css";

export default function TopNav() {
	return (
		<div className={TopnavStyle.topNavContainer}>
			<div className={TopnavStyle.logoContainer}>
				<img alt="" src={Logo} />
			</div>

			<div className={TopnavStyle.userContainer}>
				<div className={TopnavStyle.infoContainer}>
					<h2 className={TopnavStyle.Username}>Username</h2>
					<h4 className={TopnavStyle.Position}> Design Engineer Trainee </h4>
				</div>
				<div className={TopnavStyle.imageContainer}>
					<img alt="" src={User} />
				</div>
			</div>
		</div>
	);
}
