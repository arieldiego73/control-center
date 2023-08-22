import Logo from "../../Assets/Logo1.png";
import User from "../../Assets/userImage.png";
import Style from "./Topnav.module.css";

export default function TopNav() {
	return (
		<div className={Style.topNavContainer}>
			<div className={Style.logoContainer}>
				<img alt="" src={Logo} />
			</div>

			<div className={Style.userContainer}>
				<div className={Style.infoContainer}>
					<text> Username</text>
					<text> Design Engineer Trainee </text>
				</div>
				<div className={Style.imageContainer}>
					<img alt="" src={User} />
				</div>
			</div>
		</div>
	);
}
