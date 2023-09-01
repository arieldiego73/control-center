
// import React, { useState, useEffect } from "react";
// import ProjectStyle from "./Project.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { getUsersFetch } from "../../redux/state/userState";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/store/store";
// import ProjectTable from "./ProjectTable";
// import Button from "@mui/material/Button";
// import { Add } from "@mui/icons-material";
// import SearchIcon from "@mui/icons-material/Search";
// import { Link } from "react-router-dom";
// import Modal from '@mui/material/Modal';


// export default function Project() {
//   const data = useSelector((state: RootState) => state.userReducer.users);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getUsersFetch());
//   }, [dispatch]);

//   console.log(data);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredData, setFilteredData] = useState(data);

//   const handleSearch = () => {
//     // const filtered = data.filter((item) =>
//     // 	item.name.toLowerCase().includes(searchQuery.toLowerCase())
//     // );
//     // setFilteredData(filtered);
//   };

//   return (
//     <body>

//       <div className={ProjectStyle.mainContainer}>
//         <div style={{ width: "97%" }}>
//           <h4>
//             <FontAwesomeIcon icon={faUser} size="3x" color="black" />
//             <span style={{ fontSize: "40px", color: "black" }}> PROJECT </span>
//           </h4>
//         </div>

//         <div className={ProjectStyle.contentContainer}>
//           <div className={ProjectStyle.midContent}>
//             <div>
//               Insert breadcrumbs here
//             </div>
//             <div style={{ alignContent: "right" }}>
//               <Link to="/NewProj" style={{ textDecoration: "none" }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   startIcon={<Add />}
//                   style={{ textTransform: "none" }}
//                 >
//                   Add Project
//                 </Button>
//               </Link>
//             </div>
//           </div>
//           <div className={ProjectStyle.contentHolder}>
//             {/* Start of Header */}
//             <div className={ProjectStyle.mainSearchContainer}>
//               <div className={ProjectStyle.searchContainerCol}>
//                 <div className={ProjectStyle.searchContainer}>
//                   <span>Name :</span>
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className={ProjectStyle.searchBox}
//                   />
//                 </div>
//                 <div className={ProjectStyle.searchContainer}>
//                   <span>Name :</span>
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className={ProjectStyle.searchBox}
//                   />
//                 </div>
//               </div>
//               <div className={ProjectStyle.searchContainerCol}>
//                 <div className={ProjectStyle.searchContainer}>
//                   <span>Name :</span>
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className={ProjectStyle.searchBox}
//                   />
//                 </div>
//                 <div className={ProjectStyle.searchContainer}>
//                   <span>Name :</span>
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className={ProjectStyle.searchBox}
//                   />
//                 </div>
//               </div>
//               {/* Start of Table */}
//               <div className={ProjectStyle.tableContainer}>
//                 <ProjectTable />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </body>
//   );
// }

































import React, { useState, useEffect } from "react";
import ProjectStyle from "./Project.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getUsersFetch } from "../../redux/state/userState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import ProjectTable from "./ProjectTable";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import Modal from '@mui/material/Modal';


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
    <body>
      <div className={ProjectStyle.mainContainer}>
        <div style={{ width: "97%" }}>
          <h4>
            <FontAwesomeIcon icon={faUser} size="3x" color="black" />
            <span style={{ fontSize: "40px", color: "black" }}> PROJECT </span>
          </h4>
        </div>

        <div className={ProjectStyle.contentContainer}>
          <div className={ProjectStyle.midContent}>
            <div>
              Insert breadcrumbs here
            </div>
            <div style={{ alignContent: "right" }}>
              <Link to="/NewProj" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  style={{ textTransform: "none" , fontFamily:"Montserrat, sans-serif" }}
                >
                  Add Project
                </Button>
              </Link>
            </div>
          </div>
          <div className={ProjectStyle.contentHolder}>
            {/* Start of Header */}
            <div className={ProjectStyle.searchBarContainer}>
              <div className={ProjectStyle.searchBarCol}>
                {/* Start of first search bar */}
                <div className={ProjectStyle.searchBarHolder1}>
                  <span>Name</span>
                  <span>:</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      padding: 5,
                      fontSize: 16,
                      backgroundColor: "#dce0e0",
                      borderRadius: "5px",
                      border: "none",
                    }}
                  />
                </div>

                <div className={ProjectStyle.searchBarHolder2}>
                  <span>Department</span>
                  <span>:</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      padding: 5,
                      fontSize: 16,
                      backgroundColor: "#dce0e0",
                      borderRadius: "5px",
                      border: "none",
                    }}
                  />
                </div>
              </div>

              {/* Start of second search bar */}
              <div className={ProjectStyle.searcBar1}>
                <div className={ProjectStyle.searchBarCol}>
                  <div className={ProjectStyle.searchBarHolder1}>
                    <span>Position</span>
                    <span>:</span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        padding: 5,
                        fontSize: 16,
                        backgroundColor: "#dce0e0",
                        borderRadius: "5px",
                        border: "none",
                      }}
                    />
                  </div>

                  <div className={ProjectStyle.searchBarHolder2}>
                    <span>Business Unit</span>
                    <span>:</span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        padding: 5,
                        fontSize: 16,
                        backgroundColor: "#dce0e0",
                        borderRadius: "5px",
                        border: "none",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={ProjectStyle.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                  style={{ textTransform: "none" , fontFamily:"Montserrat, sans-serif"}}
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Start of Table */}
            <div className={ProjectStyle.tableContainer}>
              <ProjectTable />
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}