import MuiPagination from "@mui/material/Pagination";
import { TablePaginationProps } from "@mui/material/TablePagination";
import {
	useGridApiContext,
	useGridSelector,
	gridPageCountSelector,
	GridPagination,
} from "@mui/x-data-grid";

export default function CustomPagination(props: any) {
	return <GridPagination ActionsComponent={Pagination} {...props} />;
}

function Pagination({
	page,
	onPageChange,
	className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
	const apiRef = useGridApiContext();
	const pageCount = useGridSelector(apiRef, gridPageCountSelector);

	return (
		<MuiPagination
			color="standard"
			size="small"
			shape="rounded"
			className={className}
			count={pageCount}
			page={page + 1}
			onChange={(event, newPage) => {
				onPageChange(event as any, newPage - 1);
			}}
		/>
	);
}
