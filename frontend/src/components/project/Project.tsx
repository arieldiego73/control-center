import React, {useState, useEffect} from 'react';
import ProjectStyle from './Project.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getUsersFetch } from '../../redux/state/userState';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import ProjectTable from './ProjectTable';
import Button from "@mui/material/Button"; 
import { Add } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';


export default function Project() {
  const data = useSelector((state: RootState) => state.userReducer.users);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsersFetch());
	}, [dispatch]);

	console.log(data);

	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState(data);

	const handleSearch = () => {
		// const filtered = data.filter((item) =>
		// 	item.name.toLowerCase().includes(searchQuery.toLowerCase())
		// );
		// setFilteredData(filtered);
	};

  return (
    <div className={ProjectStyle.mainContainer}>
      
      <div style={{ width: "97%", }}> 
        <h4 >
          <FontAwesomeIcon icon={faUser} size="3x" color='black'/> 
          <span style={{fontSize: '40px', color:'black'}}> USER </span>
        </h4>
      </div>
     

      <div style={{  width: '97%', border: '1px solid-red'}}>
       BreadCrumbs to ha! // Eto din // 3rd breadcrumb
          <div style={{textAlign:'right', marginBottom: "8px"}}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              style={{ textTransform: "none" }}
            >
              Add User
            </Button>
          </div>
   
      </div>
    

      <div className={ProjectStyle.contentContainer}>
      

			<div className={ProjectStyle.contentHolder}>
				{/* Start of Header */}
				<div
					style={{
						flexDirection: "row",
						backgroundColor: "white",
						display: "flex",
						border: "1px solid black",
						alignSelf: "center",
						justifyContent: "center",
					}}
				>
					<div
						style={{
							flexDirection: "column",
							display: "flex",
							paddingTop: "1%",
							paddingBottom: "1%",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: "12px",
                alignItems:'right'
							}}
						>
							<div >
								{/* Start of first search bar */}
								<div className={ProjectStyle.searchBarHolder1}>
									<input
										type="text"
										placeholder="Name"
										value={searchQuery}
										onChange={(e) =>
											setSearchQuery(e.target.value)
										}
										style={{ padding: 5, fontSize: 16, backgroundColor:'#dce0e0'}}
									/>
								</div>

								<div className={ProjectStyle.searchBarHolder2}>
									<input
										type="text"
										placeholder="Position"
										value={searchQuery}
										onChange={(e) =>
											setSearchQuery(e.target.value)
										}
										style={{ padding: 5, fontSize: 16,  backgroundColor:'#dce0e0' }}
									/>
								</div>
							</div>

							{/* Start of second search bar */}
							<div className={ProjectStyle.searcBar1}>
								<div className={ProjectStyle.searchBarHolder1}>
									<input
										type="text"
										placeholder="Name"
										value={searchQuery}
										onChange={(e) =>
											setSearchQuery(e.target.value)
										}
										style={{ padding: 5, fontSize: 16, backgroundColor:'#dce0e0' }}
									/>
								</div>

								<div className={ProjectStyle.searchBarHolder2}>
									<input
										type="text"
										placeholder="Position"
										value={searchQuery}
										onChange={(e) =>
											setSearchQuery(e.target.value)
										}
										style={{ padding: 5, fontSize: 16,  backgroundColor:'#dce0e0' }}
									/>
								</div>
							</div>
						</div>

						<div style={{ marginTop: "24px" }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                style={{ textTransform: "none" }}
              >
                Search
              </Button>
						</div>
					</div>
				</div>

				{/* Start of Table */}
				<div
					style={{
						backgroundColor: "white",
						border: "1px solid black",
					}}
				>
					<ProjectTable />
				</div>
			</div>
		</div>

    </div>
  );
}
