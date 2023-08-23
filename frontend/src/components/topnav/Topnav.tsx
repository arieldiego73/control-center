import Logo from "../../Assets/Logo1.png";
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
					<text className={TopnavStyle.Username}>Username</text>
					<text className={TopnavStyle.Position}> Design Engineer Trainee </text>
				</div>
				<div className={TopnavStyle.imageContainer}>
					<img alt="" src={User} />
				</div>
			</div>
		</div>
	);
}
