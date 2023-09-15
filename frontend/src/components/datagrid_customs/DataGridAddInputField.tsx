import {
	FormControl,
	FormLabel,
	TextField,
	InputAdornment,
} from "@mui/material";
import React, { ReactElement } from "react";

interface DataGridAddTextFieldProps {
	inputLabel: string;
	inputValue: any;
	inputValueSetter: (value: React.SetStateAction<any>) => void;
	inputRef?: React.Ref<any>;
	textFieldIcon?: ReactElement;
	autoFocus?: boolean;
	type?: React.HTMLInputTypeAttribute;
}

const DataGridAddTextField: React.FC<DataGridAddTextFieldProps> = (props) => {
	const {
		inputLabel,
		inputValue,
		inputValueSetter,
		inputRef,
		textFieldIcon,
		autoFocus,
		type,
	} = props;

	return (
		<FormControl fullWidth>
			<FormLabel
				style={{
					fontWeight: "bold",
				}}
			>
				{inputLabel}
			</FormLabel>
			<TextField
				style={{ width: "100%" }}
				size="small"
				onChange={inputValueSetter}
				value={inputValue}
				autoFocus={autoFocus}
				inputRef={inputRef}
				type={type}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{textFieldIcon}
						</InputAdornment>
					),
				}}
			/>
		</FormControl>
	);
};

export default DataGridAddTextField;
