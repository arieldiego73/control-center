import { GridRowsProp, GridRowModesModel } from "@mui/x-data-grid";

export default interface EditToolbarProps {
    setRowProp: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
	setRowModesModel: (
		newModel: (oldModel: GridRowModesModel) => GridRowModesModel
	) => void;
}