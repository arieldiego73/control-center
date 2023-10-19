package com.controlcenter.controlcenter.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpSession;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.model.ProjectInput;
import com.controlcenter.controlcenter.model.ProjectOutput;
import com.controlcenter.controlcenter.model.ProjectTable;
import com.controlcenter.controlcenter.service.ProjectService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/project")
public class ProjectController {
    
    @Autowired
    public ProjectService projectService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/project-table")
    public ResponseEntity<List<ProjectTable>> projectTable(HttpSession httpSession) {
        // Check if the user is authenticated 
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        if (isAuthenticated != null && isAuthenticated) {
            // User is authenticated
            return projectService.projectTable();
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body(new ArrayList<ProjectTable>());
        }
    }

    //get all managers of a project
    @GetMapping("/managers/{proj_id}")
    public ResponseEntity<List<Map<String, Object>>> getAllManagersOfProject(@PathVariable String proj_id) {
        return projectService.getAllManagersOfProject(proj_id);
    }

    //get all development phases of a project
    @GetMapping("/development-phases/{proj_id}")
    public ResponseEntity<List<Map<Long, Object>>> getAllPhasesOfProject(@PathVariable String proj_id) {
        return projectService.getAllPhasesOfProject(proj_id);
    }

    //get all members of a project
    @GetMapping("/members/{proj_id}")
    public ResponseEntity<List<Map<String, Object>>> getAllMembersOfProject(@PathVariable String proj_id) {
        return projectService.getAllMembersOfProject(proj_id);
    }

    //get all development technologies of a project
    @GetMapping("/development-technologies/{proj_id}")
    public ResponseEntity<List<Map<Long, Object>>> getAllTechnologiesOfProject(@PathVariable String proj_id) {
        return projectService.getAllTechnologiesOfProject(proj_id);
    }

    //get the client of a project
    @GetMapping("/client/{proj_id}")
    public ResponseEntity<List<Map<Long, Object>>> getClientOfProject(@PathVariable String proj_id) {
        return projectService.getClientOfProject(proj_id);
    }

    //get the development type of a project
    @GetMapping("/development-type/{proj_id}")
    public ResponseEntity<List<Map<Long, Object>>> getDevelopmentOfProject(@PathVariable String proj_id) {
        return projectService.getDevelopmentTypeOfProject(proj_id);
    }

    //get the status of a project
    @GetMapping("/status/{proj_id}")
    public ResponseEntity<List<Map<Long, Object>>> getStatusOfProject(@PathVariable String proj_id) {
        return projectService.getStatusOfProject(proj_id);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProjectOutput>> getAllProject(HttpSession httpSession) {
        // Check if the user is authenticated 
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        if (isAuthenticated != null && isAuthenticated) {
            // User is authenticated
            return projectService.getAllProject();
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body(new ArrayList<ProjectOutput>());
        }
    }

    @GetMapping("attribute/{proj_id}")
    public ResponseEntity<Map<String, Object>> getAttributesOfProject(@PathVariable String proj_id) {
        return projectService.getAttributesOfProject(proj_id);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addProject(@RequestBody ProjectOutput project, @RequestParam(required = false) List<String> manager_ids, @RequestParam Long client_id, @RequestParam(required = false) Long type_id, @RequestParam List<Long> phase_ids, @RequestParam List<Long> tech_ids, @RequestParam Long project_status_id, 
    @RequestParam(required = false) List<String> member_ids, HttpSession httpSession){
    //    Check if the user is authenticated
       Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

       if (isAuthenticated != null && isAuthenticated) {
        //    User is authenticated,  proceed with adding
        //    For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<ProjectOutput>> errors = validator.validate(project);
                //Error Handling
                if(errors.size() > 0){
                    return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
                } else{
                    String emp_id = httpSession.getAttribute("session").toString();
                    return projectService.addProject(project, emp_id, manager_ids, client_id, type_id, phase_ids, tech_ids, project_status_id, member_ids);   
                }
            } else {
                // is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editProjectInfo(@PathVariable String id, @RequestBody ProjectInput project, @RequestParam(required = false) List<String> manager_ids, @RequestParam Long client_id, @RequestParam(required = false) Long type_id, @RequestParam List<Long> phase_ids, @RequestParam List<Long> tech_ids, @RequestParam Long project_status_id, @RequestParam(required = false) List<String> member_ids, HttpSession httpSession) {
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        if (isAuthenticated != null && isAuthenticated){
            // User is authenticated,  proceed with adding
            //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<ProjectInput>> errors = validator.validate(project);
                //Error Handling
                if(errors.size() > 0){
                    return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
                } else{
                    String emp_id = httpSession.getAttribute("session").toString();
                    return projectService.editProjectInfo(id, project, emp_id, manager_ids, client_id, type_id, phase_ids, tech_ids, project_status_id, member_ids);
                }
            } else {
                // User is not authenticated 
                return ResponseEntity.status(401).body("Unauthorized");
            }
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<String> logicalDeleteProject(@PathVariable String id, HttpSession httpSession) {
         // Check uf the user is authenticated
         Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

         if (isAuthenticated != null && isAuthenticated){
            try {
                String emp_id = httpSession.getAttribute("session").toString();
                return ResponseEntity.ok().body(projectService.logicalDeleteProject(id, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
             // User is not authenticated
             return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultipleProject(@RequestParam List<Long> ids, HttpSession httpSession) {
        // Check uf the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                String emp_id = httpSession.getAttribute("session").toString();
            return ResponseEntity.ok().body(projectService.deleteMultipleProject(ids, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error");
            }
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreProject(@PathVariable String id, HttpSession httpSession) {
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                return ResponseEntity.ok().body(projectService.restoreProject(id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
            return ResponseEntity.status(401).body("Unauthorized");
        }    
    }
}
