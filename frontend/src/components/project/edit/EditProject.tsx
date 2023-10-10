import React, { useEffect, useState } from "react";
import EditProjectStyle from "./EditProjectStyle.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  FormControl,
  FormLabel,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Chip,
  Avatar,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  OutlinedInput,
  Box,
  AlertColor,
  Snackbar,
  Alert,
  DialogContentText,
  IconButton, 
  FormHelperText,
  InputLabel,
  Backdrop,
} from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Add } from "@mui/icons-material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddMemberTable from "../AddMemberTable";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import AddProjManagerTable from "../AddProjManagerTable";
import ReactQuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import HelpIcon from "@mui/icons-material/Help";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClientFetch } from "../../../redux/state/clientState";
import { RootState } from "../../../redux/store/store";
import { getDevPhaseFetch } from "../../../redux/state/devPhaseState";
import AddClientNameTable from "../AddClientNameTable";
import { GridRowParams, GridRowSelectionModel } from "@mui/x-data-grid";
import { getUsersFetch } from "../../../redux/state/userState";
import { getTechnologyFetch } from "../../../redux/state/technologyState";
import { getProjectStatusFetch } from "../../../redux/state/projectStatusState";
import dayjs, { Dayjs } from "dayjs";
import {
  Data,
  getProjectInfo,
  updateProject,
} from "../../../redux/saga/projectSaga";
import { getDevTypeFetch } from "../../../redux/state/devTypeState";
import {
  addProjectReset,
  clearProjectInfo,
} from "../../../redux/state/projectState";
import stringAvatar from "../../custom_color/avatar_custom_color";
import ProjectTableDialog from "../dialogs/ProjectTableDialog";
import CircularProgress from "@mui/material/CircularProgress";


export interface SnackbarMessage {
  message: string;
  key: number;
}

export interface State {
  open: boolean;
  snackPack: readonly SnackbarMessage[];
  messageInfo?: SnackbarMessage;
}

const GLOBAL_TIMEOUT = 3000;
const DEFAULT_MANAGER_ID = 100;

export default function EditProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const PROJECT_ID = location.state;

  const loadingState = useSelector(
    (state: RootState) => state.projectReducer.isLoading
  );

  useEffect(() => {
    setIsLoading(loadingState);
  }, [loadingState]);

  React.useEffect(() => {
    if (PROJECT_ID) {
      dispatch(getProjectInfo({ projectId: PROJECT_ID }));
    } else {
      navigate("/project");
    }

    return () => {
      dispatch(clearProjectInfo());
      setClientName("");
    };
  }, []);
  const notice = useSelector((state: RootState) => state.projectReducer.notice);
  const isInitialAmount = React.useRef(true);
  React.useEffect(() => {
    if (!isInitialAmount.current) {
      if (notice.message && notice.severity) {
        handleClickSnackpack(notice.message, notice.severity as AlertColor)();
      }
    } else {
      isInitialAmount.current = false;
    }
  }, [notice]);

  const [snackPack, setSnackPack] = React.useState<readonly SnackbarMessage[]>(
    []
  );
  const [severity, setSeverity] = React.useState<AlertColor>("error");
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState<
    SnackbarMessage | undefined
  >(undefined);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClickSnackpack =
    (message: string, severity: AlertColor) => () => {
      setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
      setSeverity(severity);
    };

  const handleClose = (event: React.SyntheticEvent | Event) => {
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const [ask, setAsk] = React.useState(false);
  const [askSave, setAskSave] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogTitleSave, setDialogTitleSave] = React.useState("");
  const [dialogContentText, setDialogContentText] = React.useState("");
  const [dialogContentTextSave, setDialogContentTextSave] = React.useState("");

  const handleCancelDialog = () => {
    setAsk(true);
    setDialogTitle("Cancel the edit?");
    setDialogContentText("The record will be discarded and will not be saved. \n Are you sure you want to leave this page?");
  };

  // const handleSaveDialog = () => {
  // 	if (
  // 		projectName &&
  // 		projectDescription &&
  // 		selectedStartDate &&
  // 		selectedEndDate &&
  // 		selectedClientId &&
  // 		status &&
  // 		projectMembers &&
  // 		projectDevPhase &&
  // 		projectTechnologies
  // 	) {
  // 		setAsk(true);
  // 		setDialogTitle("Save the record?");
  // 		setDialogContentText(
  // 			"Upon proceeding, the modifications made on the record \nwill be saved."
  // 		);
  // 		setIsSaving(true);
  // 	} else {
  // 		handleClickSnackpack(
  // 			"Only Development Type and managers are optional. Please, fill out all the required fields.",
  // 			"error"
  // 		)();
  // 	}
  // };

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSaveDialog = () => {
    setFormSubmitted(true);
    if (
      !clientName ||
      !projectName ||
      !projectDescription ||
      !selectedStartDate ||
      !selectedEndDate ||
      !selectedClientId ||
      !status ||
      !projectMembers ||
      !projectDevPhase ||
      projectTechnologies.length === 0
    ) {
      handleClickSnackpack(
        "Please fill in all the required fields",
        "error"
      )();
    } else if (
      clientName &&
      projectName &&
      projectDescription &&
      selectedStartDate &&
      selectedEndDate &&
      selectedClientId &&
      status &&
      projectMembers &&
      projectDevPhase &&
      projectTechnologies
    ) {
      // setAsk(true);
      // setDialogTitle("Save the record?");
      // setDialogContentText(
      //   "Upon proceeding, the modifications made on the record \nwill be saved."
      // );
      setAskSave(true);
      setDialogTitleSave("Save the record?");
      setDialogContentTextSave(
        "Do you want to save changes you made?"
      );
    } else {
      handleClickSnackpack(
        "Only Development Type and Managers are optional. Please, fill out all the required fields.",
        "error"
      )();
    }
  };

  const [projectManager, setProjectManager] = useState<GridRowSelectionModel>();
  const [selectedProjectManagers, setSelectedProjectManagers] = useState<
    string[]
  >([]);
  const [temporaryManagers, setTemporaryManagers] =
    useState<GridRowSelectionModel>(); // for temporary selected managers
  const [projectMembers, setProjectMembers] = useState<GridRowSelectionModel>();
  const [selectedProjectMembers, setSelectedProjectMembers] = useState<
    string[]
  >([]);
  const [temporaryMembers, setTemporaryMembers] =
    useState<GridRowSelectionModel>(); // for temporary selected members
  const [projectClient, setProjectClient] = useState<GridRowParams>();
  const [clientName, setClientName] = useState("Select a client");
  const [selectedClientId, setSelectedClientId] = useState<number[]>([]);
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDevPhase, setProjectDevPhase] = useState<number[]>([]);
  const [projectTechnologies, setProjectTechnologies] = useState<number[]>([]);
  const [projectName, setProjectName] = React.useState("");
  const [selectedStartDate, setSelectedStartDate] =
    React.useState<Dayjs | null>(dayjs());
  const [selectedEndDate, setSelectedEndDate] = React.useState<Dayjs | null>(
    dayjs().add(1, "day")
  );
  const [status, setStatus] = useState(0);
  const [devType, setDevType] = useState(0);
  const [projectCode, setProjectCode] = useState("");

  React.useEffect(() => {
    dispatch(getClientFetch());
    dispatch(getDevPhaseFetch());
    dispatch(getUsersFetch()); // to fetch all users for project manager selections
    dispatch(getTechnologyFetch());
    dispatch(getProjectStatusFetch());
    dispatch(getDevTypeFetch());
  }, [dispatch]);

  const clientsData = useSelector(
    (state: RootState) => state.clientReducer.clients
  );
  const devPhaseData = useSelector(
    (state: RootState) => state.devPhaseReducer.devPhase
  );
  const usersData = useSelector((state: RootState) => state.userReducer.users);
  const technologies = useSelector(
    (state: RootState) => state.techReducer.technology
  );
  const statuses = useSelector(
    (state: RootState) => state.projectStatusReducer.projectStatus
  );
  const devTypes = useSelector(
    (state: RootState) => state.devTypeReducer.devType
  );

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const [openMembers, setOpenMembers] = React.useState(false);
  const [openProjManager, setOpenProjManager] = React.useState(false);
  const [openClientName, setOpenClientName] = React.useState(false);

  const projectInfo = useSelector(
    (state: RootState) => state.projectReducer.projectInfo
  );

  React.useEffect(() => {
    if (projectInfo) {
      const client: any = clientsData.find(
        (client: any) => client.client_id === projectInfo.client_id
      );
      if (client) setClientName(client?.client_name);

      setProjectName(projectInfo.proj_name);
      setProjectDescription(projectInfo.proj_desc);
      setSelectedStartDate(dayjs(projectInfo.start_date));
      setSelectedEndDate(dayjs(projectInfo.end_date));
      setSelectedClientId([projectInfo.client_id]);
      setStatus(projectInfo.status_code);
      setProjectManager(projectInfo.manager_emp_id);
      setProjectMembers(projectInfo.member_emp_id);
      setProjectDevPhase(projectInfo.dev_phase_id);
      setProjectTechnologies(projectInfo.tech_id);
      setDevType(projectInfo.dev_type_id[0]);
      setProjectCode(projectInfo.proj_code);
    }
  }, [clientsData, projectInfo]);

  React.useEffect(() => {
    setSelectedProjectManagers(() => {
      return usersData
        .filter((user: any) => projectManager?.includes(user?.emp_id))
        .map((user: any) => `${user?.fname} ${user?.lname}`)
        .sort();
    });
  }, [projectManager, usersData]);
  // this will trigger re-render of the chips of project members when the dependencies has changed

  React.useEffect(() => {
    setSelectedProjectMembers(() => {
      return usersData
        .filter((user: any) => projectMembers?.includes(user?.emp_id))
        .map((user: any) => `${user?.fname} ${user?.lname}`)
        .sort();
    });
  }, [projectMembers, usersData]);

  const [startDateError, setStartDateError] = React.useState(false);
  const [endDateError, setEndDateError] = React.useState(false);
  const handleProjectDurationChange = (e: Dayjs | null, type: string) => {
    if (selectedStartDate?.isBefore(selectedEndDate)) {
      setStartDateError(false);
      setEndDateError(false);
    }

    if (type === "start") {
      if (selectedEndDate && e) {
        if (e.isBefore(selectedEndDate)) {
          setStartDateError(false);
          setSelectedStartDate(dayjs(e));
        } else {
          // handleClickSnackpack(
          //   "The start date cannot be later than the end. Please, try again.",
          //   "error"
          // )();
          setStartDateError(true);
          // setSelectedStartDate(dayjs());
          // setSelectedEndDate(dayjs().add(1, "month"));
        }
      } else {
        setSelectedStartDate(dayjs(e));
      }
    } else {
      if (selectedStartDate && e) {
        if (e.isAfter(selectedStartDate)) {
          setSelectedEndDate(dayjs(e));
          setEndDateError(false);
        } else {
          // handleClickSnackpack(
          //   "The end date cannot be earlier than the start. Please, try again.",
          //   "error"
          // )();
          setEndDateError(true);
          // setSelectedStartDate(dayjs());
          // setSelectedEndDate(dayjs().add(1, "month"));
        }
      } else {
        setSelectedEndDate(dayjs(e));
      }
    }
  };
  // const handleProjectDurationChange = (e: Dayjs | null, type: string) => {
  // 	if (type === "start") {
  // 		if (selectedEndDate && e) {
  // 			if (e.isBefore(selectedEndDate)) {
  // 				setSelectedStartDate(dayjs(e));
  // 			} else {
  // 				handleClickSnackpack(
  // 					"The start date cannot be later than the end. Please, try again.",
  // 					"error"
  // 				)();
  // 				setSelectedStartDate(dayjs());
  // 				setSelectedEndDate(dayjs().add(1, "month"));
  // 			}
  // 		} else {
  // 			setSelectedStartDate(dayjs(e));
  // 		}
  // 	} else {
  // 		if (selectedStartDate && e) {
  // 			if (e.isAfter(selectedStartDate)) {
  // 				setSelectedEndDate(dayjs(e));
  // 			} else {
  // 				handleClickSnackpack(
  // 					"The end date cannot be earlier than the start. Please, try again.",
  // 					"error"
  // 				)();
  // 				setSelectedStartDate(dayjs());
  // 				setSelectedEndDate(dayjs().add(1, "month"));
  // 			}
  // 		} else {
  // 			setSelectedEndDate(dayjs(e));
  // 		}
  // 	}
  // };

  const handleSelectDevPhaseChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const id = parseInt(event.target.name);
    const idIndex = projectDevPhase.indexOf(id);

    if (idIndex !== -1) {
      const newProjectDevPhase = [
        ...projectDevPhase.slice(0, idIndex),
        ...projectDevPhase.slice(idIndex + 1),
      ];
      setProjectDevPhase(newProjectDevPhase);
    } else {
      setProjectDevPhase([...projectDevPhase, id]);
    }
  };

  const handleSelectTechnologies = (
    e: SelectChangeEvent<typeof projectTechnologies>
  ) => setProjectTechnologies(e.target.value as number[]);

  const handleTechValueRendering = () => {
    const selectedTechs: string[] = [];
    projectTechnologies.forEach((techId) => {
      const matchingTech: any = technologies.find(
        (tech: any) => tech.tech_id === techId
      );
      if (matchingTech) {
        selectedTechs.push(matchingTech.tech_name);
      }
    });
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
        }}
      >
        {projectTechnologies.length > 0 ? (
          selectedTechs.map((value) => (
            <Chip color="success" key={value} label={value} />
          ))
        ) : (
          <Chip key={0} label="Select technologies..." />
        )}
      </Box>
    );
  };

  const proceedToSaveProject = () => {
    const projectInfo: Data = {
      proj_name: projectName,
      proj_code: projectCode,
      proj_description: projectDescription,
      start_date: dayjs(selectedStartDate),
      end_date: dayjs(selectedEndDate),
      projectStatusId: status,
      devTypeId: devType,
      clientId: selectedClientId,
      selectedManagers: projectManager
        ? (projectManager as number[])
        : [DEFAULT_MANAGER_ID],
      selectedMembers: projectMembers as number[],
      selectedDevPhase: projectDevPhase,
      selectedTechnologies: projectTechnologies,
    };
    dispatch(updateProject({ data: projectInfo, projectId: PROJECT_ID }));
    setAsk(false);
  };

  const handleCancel = () => {
    dispatch(clearProjectInfo());
    setClientName("");
    navigate("/projects");
  };

  // FOR REDIRECT AFTER SAVING
  const isAddSuccess = useSelector(
    (state: RootState) => state.projectReducer.isAddSuccess
  );
  React.useEffect(() => {
    if (isAddSuccess) {
      dispatch(addProjectReset());
      setTimeout(() => {
        navigate("/projects");
      }, GLOBAL_TIMEOUT);
    }
  }, [dispatch, isAddSuccess, navigate]);

  const buttonStyle: React.CSSProperties = {
    transition: "all 0.3s",
  };

  return (
    <>
      <div className={EditProjectStyle.mainContainer}>
        <div className={EditProjectStyle.mainHolder}>
          <div className={EditProjectStyle.contentHolder}>
            <div className={EditProjectStyle.contentHolderLeft}>
              <div className={EditProjectStyle.clientCard}>
                <FormControl
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <div style={{ display: "flex", width: "100%" }}>
                    <List>
                      <ListItem>
                        <ListItemText
                          secondary={"Project Code: " + projectCode}
                        >
                          <Typography
                            variant="h4"
                            style={{
                              fontWeight: 900,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {clientName}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </List>
                    <List
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        width: "50%",
                      }}
                    >
                      <Button
                        className={`${EditProjectStyle.editClientButton} ${
                          clientName === ""
                            ? EditProjectStyle.chooseClient
                            : EditProjectStyle.changeClient
                        }`}
                        style={buttonStyle}
                        sx={{
                          width: "64px",
                          height: "64px",
                          borderRadius: "100%",
                          display: "flex",
                          justifyContent: "center",
                          padding: 0,
                          margin: 0,
                          backgroundColor: "rgb(240, 240, 240)",
                          whiteSpace: "nowrap",
                        }}
                        onClick={() => setOpenClientName(true)}
                      >
                        <svg
                          className={EditProjectStyle.editClientButtonSvg}
                          style={{ padding: 0, margin: 0 }}
                          viewBox="0 0 512 512"
                        >
                          <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c-1.4-4.9-3.8-9.4-6.9-13.3l-22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c-6.2-6.2-16.4-6.2-22.6 0s-6.2-16.4 0-22.6z"></path>
                        </svg>
                      </Button>
                    </List>
                  </div>
                </FormControl>
              </div>

              {/* DONE */}
              <div>
                <FormControl>
                  <TextField
                    style={{
                      backgroundColor: "transparent",
                      width: "570px",
                      minWidth: "200px",
                    }}
                    label="Project Name"
                    error={formSubmitted && projectName === ""}
                    helperText={
                      formSubmitted && projectName === "" ? "Missing field" : ""
                    }
                    variant="outlined"
                    size="small"
                    placeholder="Project Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FolderOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </FormControl>
              </div>

              {/* DONE */}
              <div className={EditProjectStyle.formRow8}>
                <div className="projStatus">
                  <div className="projStatusContent">
                    <FormControl
                      variant="outlined"
                      size="small"
                      error={formSubmitted && status === 0}
                    >
                      <InputLabel>Status</InputLabel>
                      <Select
                        label="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as number)}
                        startAdornment={
                          <InputAdornment position="start">
                            <GroupsOutlinedIcon />
                          </InputAdornment>
                        }
                        sx={{
                          minWidth: 250,
                          maxWidth: 560,
                        }}
                      >
                        {statuses.map((status: any) => (
                          <MenuItem
                            key={status?.proj_status_id}
                            value={status?.proj_status_id}
                          >
                            {status?.proj_status_name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formSubmitted && status === 0 && (
                        <FormHelperText>Select a status</FormHelperText>
                      )}
                    </FormControl>
                  </div>
                </div>
              </div>

              {/* DONE */}
              <div className={EditProjectStyle.formRow3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <FormControl error={startDateError}>
                    <DatePicker
                      label="Start Date"
                      value={selectedStartDate}
                      reduceAnimations
                      slotProps={{
                        textField: {
                          error: startDateError,
                        },
                      }}
                      onChange={(e) => handleProjectDurationChange(e, "start")}
                    />

                    {startDateError && (
                      <FormHelperText>
                        The start date cannot be later than the end
                      </FormHelperText>
                    )}
                  </FormControl>
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <FormControl error={endDateError}>
                    <DatePicker
                      label="End Date"
                      value={selectedEndDate}
                      reduceAnimations
                      slotProps={{
                        textField: {
                          error: endDateError,
                        },
                      }}
                      onChange={(e) => handleProjectDurationChange(e, "end")}
                    />

                    {endDateError && (
                      <FormHelperText>
                        The end date cannot be earlier than the start
                      </FormHelperText>
                    )}
                  </FormControl>
                </LocalizationProvider>
              </div>

              {/* DEV TYPE */}
              <div className={EditProjectStyle.formRow8}>
                <div className="projDevType">
                  <div className="projDevTypeContent">
                    <FormControl
                      variant="outlined"
                      size="small"
                      error={formSubmitted && devType === 1}
                    >
                      <InputLabel id="demo-controlled-open-select-label">
                        {"Development Type (optional)"}
                      </InputLabel>
                      <Select
                        label="Development Type (optional)"
                        value={devType}
                        onChange={(e) => setDevType(e.target.value as number)}
                        startAdornment={
                          <InputAdornment position="start">
                            <GroupsOutlinedIcon />
                          </InputAdornment>
                        }
                        sx={{
                          minWidth: 250,
                          maxWidth: 560,
                        }}
                      >
                        {devTypes.map((devType: any) => (
                          <MenuItem
                            key={devType?.dev_type_id}
                            value={devType?.dev_type_id}
                          >
                            {devType?.dev_type_name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formSubmitted && devType === 1 && (
                        <FormHelperText>Select a status</FormHelperText>
                      )}
                    </FormControl>
                  </div>
                </div>
              </div>
 
              {/* DEVELOPMENT PHASE */}
              <div>
                <InputLabel id="demo-controlled-open-select-label">
                  Development Phase
                </InputLabel>
                <FormControl
                  style={{
                    flexDirection: "column",
                    display: "flex",
                  }}
                  error={formSubmitted && projectDevPhase.length === 0}
                >
                  <FormGroup
                    style={{
                      flexDirection: "row",
                      display: "flex",
                    }}
                  >
                    {devPhaseData.map((phase: any) => (
                      <FormControlLabel
                        key={phase.dev_phase_id}
                        control={
                          <Checkbox
                            name={String(phase.dev_phase_id)}
                            checked={projectDevPhase.includes(
                              phase.dev_phase_id
                            )}
                            onChange={handleSelectDevPhaseChange}
                          />
                        }
                        label={phase.dev_phase_sh_name}
                      />
                    ))}
                  </FormGroup>
                  {formSubmitted && projectDevPhase.length === 0 && (
                    <FormHelperText>Select a status</FormHelperText>
                  )}
                </FormControl>
              </div>
            </div>

            <div className={EditProjectStyle.contentHolderRight}>
              <div className={EditProjectStyle.contentHolderRightTop}>
                {/* PROJECT MANAGERS */}
                <div className={EditProjectStyle.formRow5}>
                  <FormControl
                    style={{
                      flexDirection: "column",
                      display: "flex",
                    }}
                    error={
                      formSubmitted && selectedProjectManagers.length === 0
                    }
                  >
                    <FormLabel
                      sx={{
                        color: "black",
                        fontWeight: "400",
                      }}
                    >
                      Project Manager
                    </FormLabel>
                    <Paper elevation={2} sx={{ padding: 2 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        width={530}
                        useFlexGap
                        flexWrap="wrap"
                      >
                        {selectedProjectManagers.map((manager) => (
                          <Chip
                            key={manager}
                            // style={{ backgroundColor: "#F4B62B" }}
                            avatar={<Avatar {...stringAvatar(manager)} />}
                            label={manager}
                          />
                        ))}
                        <IconButton
                          color="primary"
                          size="small"
                          children={
                            selectedProjectManagers.length !== 0 ? (
                              <EditIcon />
                            ) : (
                              <Add />
                            )
                          }
                          onClick={() => setOpenProjManager(true)}
                        />
                      </Stack>
                    </Paper>
                    {formSubmitted && selectedProjectManagers.length === 0 && (
                      <FormHelperText>Select Project Manager</FormHelperText>
                    )}
                  </FormControl>
                </div>

                {/* MEMBERS */}
                <div className={EditProjectStyle.formRow5}>
                  <FormControl
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      gap: "20px",
                    }}
                  >
                    <div
                      style={{
                        flexDirection: "column",
                        display: "flex",
                      }}
                    >
                      <FormLabel
                        sx={{
                          color: "black",
                          fontWeight: "400",
                        }}
                      >
                        Members (Optional)
                      </FormLabel>
                      <Paper elevation={2} sx={{ padding: 2 }}>
                        <Stack
                          direction="row"
                          spacing={1}
                          width={530}
                          useFlexGap
                          flexWrap="wrap"
                        >
                          {selectedProjectMembers.map((member) => (
                            <Chip
                              key={member}
                              avatar={
                                <Avatar {...stringAvatar(member)}></Avatar>
                              }
                              label={member}
                            />
                          ))}
                          <IconButton
                            color="primary"
                            size="small"
                            children={
                              selectedProjectMembers.length !== 0 ? (
                                <EditIcon />
                              ) : (
                                <Add />
                              )
                            }
                            onClick={() => setOpenMembers(true)}
                          />
                        </Stack>
                      </Paper>
                    </div>
                  </FormControl>
                </div>

                {/* TECHNOLOGY */}
                <div className={EditProjectStyle.formRow5}>
                  <FormControl
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      gap: "20px",
                    }}
                    error={formSubmitted && projectTechnologies.length === 0}
                  >
                    <div
                      style={{
                        flexDirection: "column",
                        display: "flex",
                      }}
                    >
                      <FormLabel
                        sx={{
                          color: "black",
                          fontWeight: "400",
                        }}
                      >
                        Technology
                      </FormLabel>
                      <Select
                        size="small"
                        multiple
                        value={projectTechnologies}
                        onChange={handleSelectTechnologies}
                        input={<OutlinedInput />}
                        renderValue={handleTechValueRendering}
                        displayEmpty
                        sx={{
                          width: 560,
                          maxWidth: 560,
                        }}
                      >
                        {technologies.map((tech: any) => (
                          <MenuItem key={tech.tech_id} value={tech.tech_id}>
                            <Checkbox
                              checked={
                                projectTechnologies.indexOf(
                                  tech.tech_id as never
                                ) > -1
                              }
                            />
                            <ListItemText primary={tech.tech_name} />
                          </MenuItem>
                        ))}
                      </Select>
                      {formSubmitted && projectTechnologies.length === 0 && (
                        <FormHelperText>Select a status</FormHelperText>
                      )}
                    </div>
                  </FormControl>
                </div>


                <div className={EditProjectStyle.col2}>
                  <FormControl
                    className={EditProjectStyle.qlContainer}
                    error={formSubmitted && projectDescription === ""}
                  >
                    <FormLabel
                      sx={{
                        color: "black",
                        fontWeight: "400",
                      }}
                    >
                      Project Description
                    </FormLabel>
                    <ReactQuillEditor
                      className={EditProjectStyle.qlContainer}
                      theme="snow"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e)}
                      modules={modules}
                      placeholder="Project description..."
                    />
                    {formSubmitted && projectDescription === "" && (
                      <FormHelperText>Select a status</FormHelperText>
                    )}
                  </FormControl>
                </div>
              </div>
            </div>

            {/* POPUPS */}

            {/* Clients */}
            <ProjectTableDialog
              open={openClientName}
              dialogTitle="Clients"
              table={
                <AddClientNameTable
                  setClient={setProjectClient}
                  data={clientsData}
                  selectedClientId={selectedClientId}
                />
              }
              onClickCancel={() => {
                setOpenClientName(false);
              }}
              onClickSave={() => {
                if (projectClient) {
                  setClientName(projectClient.row?.client_name);
                  setSelectedClientId(projectClient.row?.client_id);
                }
                setOpenClientName(false);
              }}
            />

            {/* Project Manager */}
            <ProjectTableDialog
              open={openProjManager}
              dialogTitle="Project Manager"
              table={
                <AddProjManagerTable
                  selected={projectManager}
                  data={usersData}
                  temporarySetter={setTemporaryManagers}
                />
              }
              onClickCancel={() => {
                setOpenProjManager(false);
              }}
              onClickSave={() => {
                setProjectManager(temporaryManagers);
                setOpenProjManager(false);
              }}
            />

            {/* Members */}
            <ProjectTableDialog
              open={openMembers}
              dialogTitle="Project Members"
              table={
                <AddMemberTable
                  data={usersData}
                  selected={projectMembers}
                  temporarySetter={setTemporaryMembers}
                />
              }
              onClickCancel={() => {
                setOpenMembers(false);
              }}
              onClickSave={() => {
                setProjectMembers(temporaryMembers);
                setOpenMembers(false);
              }}
            />
          </div>
          {/* SAVING BUTTONS */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
              width: "97%",
              marginRight: "10px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveOutlinedIcon />}
              style={{
                textTransform: "none",
              }}
              onClick={handleSaveDialog}
            >
              UPDATE
            </Button>
            <Button 
            variant="text" 
            onClick={handleCancelDialog}
            sx={{ backgroundColor: "#e0e0e0", "&:hover": { backgroundColor: "#c0c0c0" }}}
            >
              CANCEL
            </Button>
          </div>
        </div>
      </div>
      <Dialog
        open={ask}
        onClose={() => {
          setAsk(false);
        }}
        aria-labelledby="responsive-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="responsive-dialog-title">
          <Typography
            fontWeight={700}
            fontSize={20}
            display={"flex"}
            alignItems={"center"}
            gap={1}
          >
            <HelpIcon
              accentHeight={100}
              color="error"
              fontSize="large"
              alignmentBaseline="middle"
            />
            {dialogTitle}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            whiteSpace={"pre-line"}
            id="alert-dialog-description"
          >
            {dialogContentText}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            onClick={handleCancel}
            autoFocus
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              setAsk(false);
            }}
          >
            Continue editing
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={askSave}
        onClose={() => {
          setAskSave(false);
        }}
        aria-labelledby="responsive-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="responsive-dialog-title">
          <Typography
            fontWeight={700}
            fontSize={20}
            display={"flex"}
            alignItems={"center"}
            gap={1}
          >
            <HelpIcon
              accentHeight={100}
              color="error"
              fontSize="large"
              alignmentBaseline="middle"
            />
            {dialogTitleSave}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            whiteSpace={"pre-line"}
            id="alert-dialog-description"
          >
            {dialogContentTextSave}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            onClick={proceedToSaveProject}
            autoFocus 
          >
            Save
          </Button>

          <Button
            onClick={() => {
              setAskSave(false);
            }}
          >
            Continue editing
          </Button>
        </DialogActions>
      </Dialog>



      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={GLOBAL_TIMEOUT}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {messageInfo ? messageInfo.message : undefined}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
