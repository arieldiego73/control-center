import React from "react";
import Logo from "../../Assets/Logo1.png";
import User from "../../Assets/userImage.png";

export default function TopNav() {
	return (
		<div
			style={{
				background: "linear-gradient(to bottom, #2a7ebb, #579ed1)",
				height: "90px",
			}}
		>
			<div style={{ display: "flex", flexDirection: "row" }}>
				<div>
					<img
						alt=""
						style={{ paddingBottom: "10px" }}
						src={Logo}
						width={280}
						height={100}
					/>
				</div>

				<div
					style={{
						flexDirection: "column",
						display: "flex",
						flex: "end",
					}}
				>
					<div
						style={{
							flexDirection: "column",
							display: "flex",
							alignItems: "center",
						}}
					>
						<text> Username</text>
						<text> Design Engineer Trainee </text>
					</div>
				</div>

				{/* <img alt="" style={{ paddingBottom: '10px', paddingLeft: '70%'}} src={User} width={280} height={100} /> */}
			</div>
		</div>
	);
}
