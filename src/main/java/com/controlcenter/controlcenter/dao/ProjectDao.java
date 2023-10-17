package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.controlcenter.controlcenter.model.ClientOutput;
import com.controlcenter.controlcenter.model.DevPhaseOutput;
import com.controlcenter.controlcenter.model.DevTypeOutput;
import com.controlcenter.controlcenter.model.ProjectOutput;
import com.controlcenter.controlcenter.model.ProjectStatusOutput;
import com.controlcenter.controlcenter.model.ProjectTable;
import com.controlcenter.controlcenter.model.TechnologyOutput;
import com.controlcenter.controlcenter.model.UserInfoOutput;

@Mapper
public interface ProjectDao {
    List<ProjectTable> projectTable();

    //get all managers of a certain project
    List<UserInfoOutput> getAllManagersOfProject(String proj_id);
    //get all development phases of a project
    List<DevPhaseOutput> getAllPhasesOfProject(String proj_id);
    //get all members of a project
    List<UserInfoOutput> getAllMembersOfProject(String proj_id);
    List<UserInfoOutput> getAllMembersOfProjectForTable(String proj_id);
    //get all development technologies of a project
    List<TechnologyOutput> getAllTechnologiesOfProject(String proj_id);
    //get the client of a project
    List<ClientOutput> getClientOfProject(String proj_id);
    //get the development type of a project
    List<DevTypeOutput> getDevelopmentTypeOfProject(String proj_id);
    //get the status of a project
    List<ProjectStatusOutput> getStatusOfProject(String proj_id);

    List<ProjectOutput> getAllProjects(String proj_id);

    List<ProjectOutput> getAllProject();

    ProjectOutput getProjectById(String id);

    Long addProject(ProjectOutput project);

    void editProjectInfo(Map<String, Object> paramMap);

    void logicalDeleteProject(String id);

    void deleteMultipleProject(@Param("ids") List<Long> ids);

    void restoreProject(String id);

    
}
