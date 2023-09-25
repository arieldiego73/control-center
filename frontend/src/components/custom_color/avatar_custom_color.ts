function stringToColor(string: string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

function isColorDark(hexColor: string) {
	// Remove the # symbol if present
	hexColor = hexColor.replace(/^#/, "");

	// Parse the hex color into its RGB components
	const r = parseInt(hexColor.slice(0, 2), 16);
	const g = parseInt(hexColor.slice(2, 4), 16);
	const b = parseInt(hexColor.slice(4, 6), 16);

	// Calculate the brightness using the formula
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;

	// You can adjust this threshold as needed
	// If brightness is less than 128, consider it dark; otherwise, consider it light
	return brightness < 128;
}

export default function stringAvatar(name: string) {
	const bgColor = stringToColor(name);
	return {
		sx: {
			bgcolor: bgColor,
		},
		style: { color: `${isColorDark(bgColor) ? "#fff" : "#000"}` },
		children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
	};
}
