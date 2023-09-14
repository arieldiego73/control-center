export const datagridBoxStyle = {
	height: "100%",
	width: "100%",
	"& .actions": {
		color: "text.secondary",
	},
	"& .MuiDataGrid-columnHeaderTitle": {
		fontWeight: 800,
		padding: "0 24px",
	},
	"& .MuiDataGrid-root .MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-columnHeader:focus":
		{
			outline: "none !important",
		},
	"& .MuiDataGrid-root .MuiInputBase-input": {
		textAlign: "center",
		backgroundColor: "#fff",
	},
	"& .MuiDataGrid-root .MuiDataGrid-editInputCell": {
		padding: "0 0.8vw",
		height: "60%",
	},
	"& .MuiDataGrid-root .MuiDataGrid-row--editing .MuiDataGrid-cell": {
		backgroundColor: "#cbbdbd2e",
	},
	"& .textPrimary": {
		color: "text.primary",
	},
	".MuiDataGrid-iconButtonContainer, .MuiDataGrid-columnHeader .MuiDataGrid-menuIcon, .MuiDataGrid-columnHeaders .MuiDataGrid-columnSeparator":
		{
			visibility: "visible",
			width: "auto",
		},
	".MuiDataGrid-sortIcon": {
		opacity: "inherit !important",
	},
	".MuiTablePagination-displayedRows": {
		display: "none",
	},
	".MuiInputBase-root": {
		marginRight: 0,
	},
	// ".MuiDataGrid-cellContent": {
	// 	fontWeight: "500",
	// },
};

export const datagridStyle = {
	height: "67vh",
	border: "none"
}