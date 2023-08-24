import React, {useState, useEffect} from 'react';
import ModuleStyle from './Modal.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faTimes } from "@fortawesome/free-solid-svg-icons";
import { getUsersFetch } from '../../redux/state/userState';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import ModalTable from './ModalTable';
import Button from "@mui/material/Button"; 
import SearchIcon from '@mui/icons-material/Search';

interface popupProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const Modal: React.FC<popupProps> = (props) => {
	// const [showModal, setShowModal] = useState(false);

	// const openModal = () => {
	//   setShowModal(showModal=>!showModal);
	// };

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
    <div className={ModuleStyle.mainContainer}>
      
      {/* <div style={{ width: "97%", }}> 
        <h4 >
          <FontAwesomeIcon icon={faUser} size="3x" color='black'/> 
          <span style={{fontSize: '40px', color:'black'}}> PROJECT </span>
        </h4>
      </div>
     

      <div style={{  width: '97%', border: '1px solid-red'}}>
       BreadCrumbs to ha! // Eto din // 3rd breadcrumb
          <div style={{textAlign:'right', marginBottom: "8px"}}>
			<Link to="/userhandler" style={{ textDecoration: 'none' }}>
				<Button
					variant="contained"
					color="primary"
					startIcon={<Add />}
					style={{ textTransform: "none" }}
				>
					Add Project
				</Button>
			</Link>

          </div>
   
      </div>
     */}

      <div className={ModuleStyle.contentContainer}>

		
		<div >

			
			{/* Start of Header */}
			<div
				style={{
					backgroundColor: "white",
					border: "1px solid black",
					flexDirection:'row',
					display:'flex',
					borderTopLeftRadius: '10px',
					borderTopRightRadius: '10px',
				}}
			>

				<div style={{ width: "97%", textAlign:'left', paddingLeft: '1%'}}> 
					<h4 >
					<FontAwesomeIcon icon={faUserGroup} size="3x" color='black'/> 
					<span style={{fontSize: '40px', color:'black'}}> Members </span>
					</h4>
				</div>
		
				<div
					style={{
						marginRight: '10px',
						paddingTop: '3%',
						paddingBottom: '1%'
					}}
				>
				
						{/* Start of second search bar */}
						<div style={{flexDirection: 'column', display:'flex', gap:'5px'}}>
							<div >
								<input
									type="text"
									placeholder="Business Unit"
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
									style={{ padding: 5, fontSize: 16, backgroundColor:'#dce0e0', borderRadius: '10px' }}
								/>
							</div>

							<div>
								<input
									type="text"
									placeholder="Department"
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
									style={{ padding: 5, fontSize: 16,  backgroundColor:'#dce0e0',  borderRadius: '10px' }}
								/>
							</div>

							<div >
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

					
				</div>
			</div>

				{/* Start of Table */}
				<div
					style={{
						backgroundColor: "white",
						border: "1px solid black",
						borderBottomRightRadius: '10px',
						borderBottomLeftRadius: '10px',
					}}
				>
					<ModalTable />
				</div>
			</div>

			
			<FontAwesomeIcon
                      icon={faTimes}
                      className={ModuleStyle.clearIcon} // Apply appropriate CSS class for positioning
					  onClick={() => { props.setIsOpen(false) }} // Clear the input when X icon is clicked
                    />




		</div>


    

	

  );
}

export default Modal;
