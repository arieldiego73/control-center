package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.ClientDao;
import com.controlcenter.controlcenter.dao.DevPhaseDao;
import com.controlcenter.controlcenter.dao.DevTypeDao;
import com.controlcenter.controlcenter.dao.ProjInfoDao;
import com.controlcenter.controlcenter.dao.ProjectDao;
import com.controlcenter.controlcenter.dao.ProjectManagerDao;
import com.controlcenter.controlcenter.dao.ProjectPhaseDao;
import com.controlcenter.controlcenter.dao.ProjectTechnologyDao;
import com.controlcenter.controlcenter.dao.TechnologyDao;
import com.controlcenter.controlcenter.dao.UserDao;
import com.controlcenter.controlcenter.dao.UserProjectDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.ClientOutput;
import com.controlcenter.controlcenter.model.ProjInfoInput;
import com.controlcenter.controlcenter.model.ProjMemberInput;
import com.controlcenter.controlcenter.model.ProjMemberOutput;
import com.controlcenter.controlcenter.model.ProjectInput;
import com.controlcenter.controlcenter.model.ProjectManagerInput;
import com.controlcenter.controlcenter.model.ProjectOutput;
import com.controlcenter.controlcenter.model.ProjectPhaseInput;
import com.controlcenter.controlcenter.model.ProjectPhaseOutput;
import com.controlcenter.controlcenter.model.ProjectTable;
import com.controlcenter.controlcenter.model.ProjectTechnologyInput;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.model.UserProjectInput;
import com.controlcenter.controlcenter.service.ProjectService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class ProjectServiceImpl implements ProjectService {
    
    @Autowired
    public ProjectDao projectDao;

    @Autowired
    public ProjectManagerDao projectManagerDao;

    @Autowired
    public ClientDao clientDao;

    @Autowired
    public DevTypeDao devTypeDao;

    @Autowired
    public ProjectPhaseDao projectPhaseDao;

    @Autowired 
    public ProjectTechnologyDao projectTechnologyDao;

    @Autowired
    public ProjInfoDao projInfoDao;

    @Autowired
    public UserProjectDao userProjectDao;

    @Autowired
    public UserDao userDao;

    @Autowired
    public ActivityLogDao activityLogDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Override
    public ResponseEntity<List<ProjectTable>> projectTable() {
        return ResponseEntity.ok(projectDao.projectTable());
    }

    @Override
    public ResponseEntity<List<ProjectOutput>> getAllProject() {
        return ResponseEntity.ok(projectDao.getAllProject());
    }

    @Override
    public ProjectOutput getProjectById(String id) {
        return projectDao.getProjectById(id);
    }

    @Override
    public ResponseEntity<String> addProject(ProjectOutput project, String emp_id, List<String> manager_ids, Long client_id, Long type_id, List<Long> phase_ids, List<Long> tech_ids, Long project_status_id, List<String> member_ids) {
        ProjInfoInput projectInfo = new ProjInfoInput();
        ProjectManagerInput projectManager = new ProjectManagerInput();
        ProjectPhaseInput projectPhase = new ProjectPhaseInput();
        ProjectTechnologyInput projectTechnology = new ProjectTechnologyInput();
        UserProjectInput userProject = new UserProjectInput();
        
        try {
            projectDao.addProject(project);

            Long projectToBeSaved = project.getProj_id();

            //initializing the value of project info before saving.
            projectInfo.setDev_type_id(type_id);
            projectInfo.setClient_id(client_id);
            projectInfo.setProj_status_id(project_status_id);
            projectInfo.setProj_id(project.getProj_id());
            
            //saving of project info on tbl_proj_info table
            projInfoDao.addProjInfo(projectInfo);

            //iterating all manager_ids which are emp_id and saving them to be multiple project manager
            for(String manager_id : manager_ids) {
                projectManager.setProj_id(projectToBeSaved);
                projectManager.setEmp_id(manager_id);
                projectManagerDao.addManagers(projectManager);
            }
            
            //iterating all development phase id before saving them to be multiple project development phase
            for(Long phase_id : phase_ids) {
                projectPhase.setDev_phase_id(phase_id);
                projectPhase.setProj_id(projectToBeSaved);
                projectPhaseDao.addProjectPhase(projectPhase);
            }

            //iterating all technology id before saving them to be multiple project technology
            for(Long tech_id : tech_ids) {
                projectTechnology.setTech_id(tech_id);
                projectTechnology.setProj_id(projectToBeSaved);
                projectTechnologyDao.addProjectTechnology(projectTechnology);
            }

            //iterating all employee id before saving them as project members
            for(String member_id : member_ids) {
                userProject.setEmp_id(member_id);
                userProject.setProj_id(projectToBeSaved);
                userProjectDao.addUserProject(userProject);
            }

            // Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id(emp_id); // current logged user dapat
            activityLogInput.setLog_desc("Added a Project.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return ResponseEntity.status(200).body("Project added successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<String> editProjectInfo(String id, ProjectInput projectBody, String emp_id, List<String> manager_ids, Long client_id, Long type_id, List<Long> phase_ids, List<Long> tech_ids, Long project_status_id, List<String> member_ids) {
        ProjectOutput project = projectDao.getProjectById(id);
        
        ProjInfoInput projectInfo = new ProjInfoInput();

        ProjectManagerInput projectManager = new ProjectManagerInput();
        ProjectPhaseInput projectPhase = new ProjectPhaseInput();
        UserProjectInput projectMember = new UserProjectInput();
        
        List<UserOutput> listOfManagers = userDao.getAllUser();
        List<ProjectPhaseOutput> listOfDevelopmentPhases = projectPhaseDao.getAllProjectPhase();
        List<UserOutput> listOfMembers = userDao.getAllUser();


        if (project != null) {
            if (project.getDel_flag() == 1) {
                return ResponseEntity.status(400).body("Project with the ID " + id + " has already been deleted.");
            } else {
                //initializing the value of project
                Map<String, Object> projectMap = new HashMap<>();

                //putting the values into hashmap
                projectMap.put("id", id);
                projectMap.put("project", projectBody);

                //initializing the value of project info before saving.
                Map<String, Object> projectInfoMap = new HashMap<>();
                projectInfo.setDev_type_id(type_id);
                projectInfo.setClient_id(client_id);
                projectInfo.setProj_status_id(project_status_id);
                projectInfo.setProj_id(project.getProj_id());

                //putting the values into hashmap
                projectInfoMap.put("id", id);
                projectInfoMap.put("projInfo", projectInfo);

                //deleting all records from composite table tbl_proj_manager
                for(UserOutput manager : listOfManagers) {
                    projectManager.setProj_id(project.getProj_id());
                    projectManager.setEmp_id(manager.getEmp_id());
                    projectManagerDao.permaDeleteProjectManager(projectManager);
                }

                //adding records from composite table tbl_proj_manager
                for(String manager_id : manager_ids) {
                    projectManager.setProj_id(project.getProj_id());
                    projectManager.setEmp_id(manager_id);
                    projectManagerDao.addManagers(projectManager);
                }

                //deleting all records from composite table tbl_proj_phase
                for(ProjectPhaseOutput developmentPhase : listOfDevelopmentPhases) {
                    projectPhase.setProj_id(project.getProj_id());
                    projectPhase.setDev_phase_id(developmentPhase.getDev_phase_id());
                    projectPhaseDao.permaDeleteProjectPhase(projectPhase);
                }

                //adding records from composite table tbl_proj_phase
                for(Long phase_id : phase_ids) {
                    projectPhase.setProj_id(project.getProj_id());
                    projectPhase.setDev_phase_id(phase_id);
                    projectPhaseDao.addProjectPhase(projectPhase);
                }

                for(UserOutput member : listOfMembers) {
                    projectMember.setProj_id(project.getProj_id());
                    projectMember.setEmp_id(member.getEmp_id());
                    userProjectDao.permaDeleteProjectMember(projectMember);
                }

                for(String member_id : member_ids) {
                    projectMember.setProj_id(project.getProj_id());
                    projectMember.setEmp_id(member_id);
                    userProjectDao.addUserProject(projectMember);
                }
                
                //saving the new value of the project
                projectDao.editProjectInfo(projectMap);

                //saving of project info on tbl_proj_info table
                projInfoDao.editProjInfo(projectInfoMap);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Edited a Project.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return ResponseEntity.status(200).body("Project edited successfully.");
            }
        } else {
            return ResponseEntity.status(404).body("Project with the ID " + id + " cannot be found.");
        }
    }

    @Override
    public String logicalDeleteProject(String id, String emp_id) {
        ProjectOutput data = projectDao.getProjectById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Project with the ID " + id + " has already been deleted.";
            } else {
                projectDao.logicalDeleteProject(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Deleted a Project.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project deleted successfully.";
            }
        } else {
            return "Project with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String restoreProject(String id) {
        ProjectOutput data = projectDao.getProjectById(id);

        if (data != null) {
            if (data.getDel_flag() == 0) {
                return "Project with the ID " + id + " is not yet deleted.";
            } else {
                projectDao.restoreProject(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Restored a Project.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Project restored successfully.";
            }
        } else {
            return "Project with the ID " + id + " cannot be found.";
        }
    }
}