import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import CreateUserStyle from "./CreateUser.module.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, InputLabel, MenuItem, Select } from '@mui/material';

export default function CreateUser() {

    

    return (

        <div className={CreateUserStyle.mainContainer}>
            <div className={CreateUserStyle.heading}>
                <FontAwesomeIcon icon={faUser} size="2x" color='black' />
                <div className={CreateUserStyle.textContainer}>
                    <h3>Add New User</h3>
                </div>
            </div>
            <div className={CreateUserStyle.breadCrumbs}>
                <p>BreadCrumbs to ha! // Eto din // 3rd breadcrumb</p>
            </div>

            <div className={CreateUserStyle.contentContainer}>
                <div className={CreateUserStyle.mainForm}>
                    <div className={CreateUserStyle.formRow1}>
                        <FormControl className={CreateUserStyle.formUsername}>
                            <FormLabel>Username</FormLabel>
                            <TextField variant="outlined" size="small" />
                        </FormControl>
                    </div>
                    <div className={CreateUserStyle.formRow2}>
                        <FormControl className={CreateUserStyle.assocId}>
                            <FormLabel>Associate ID</FormLabel>
                            <TextField variant="outlined" size="small" />
                        </FormControl>
                        <FormControl className={CreateUserStyle.position}>
                            <FormLabel>Position</FormLabel>
                            <TextField variant="outlined" size="small" />
                        </FormControl>
                    </div>
                    <div className={CreateUserStyle.formRow3}>
                        <FormControl className={CreateUserStyle.fname}>
                            <FormLabel>First Name</FormLabel>
                            <TextField variant="outlined" size="small" />
                        </FormControl>
                        <FormControl className={CreateUserStyle.mname}>
                            <FormLabel>Middle Name</FormLabel>
                            <TextField variant="outlined" size="small" />
                        </FormControl>
                        <FormControl className={CreateUserStyle.lname}>
                            <FormLabel>Last Name</FormLabel>
                            <TextField variant="outlined" size="small" />
                        </FormControl>
                    </div>
                    <div className={CreateUserStyle.formRow4}>
                        <FormControl className={CreateUserStyle.email}>
                            <FormLabel>Email</FormLabel>
                            <TextField variant="outlined" size="small" />
                        </FormControl>
                    </div>
                    <div className={CreateUserStyle.formRow5}>
                        <FormControl className={CreateUserStyle.email}>
                            <FormLabel>Role</FormLabel>
                            <TextField variant="outlined" size="small" />
                        </FormControl>
                        <Button>Add Role</Button>
                    </div>
                    <div className={CreateUserStyle.formRow6}>
                        <FormControl className={CreateUserStyle.email}>
                            <FormLabel>Business Unit</FormLabel>
                            <TextField variant="outlined" size="small" />
                        </FormControl>
                    </div>
                    <div className={CreateUserStyle.formRow7}>
                        <Button>Save</Button>
                        <Button>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>

    )
}
