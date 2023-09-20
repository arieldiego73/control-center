package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.DevPhaseOutput;
import com.controlcenter.controlcenter.model.PersonalInfoOutput;
import com.controlcenter.controlcenter.model.ProjectInput;
import com.controlcenter.controlcenter.model.ProjectManagerOutput;
import com.controlcenter.controlcenter.model.ProjectOutput;
import com.controlcenter.controlcenter.model.ProjectPhaseOutput;
import com.controlcenter.controlcenter.model.ProjectTable;
import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.model.UserProjectOutput;

@Mapper
public interface ProjectDao {
    List<ProjectTable> projectTable();

    //get all managers of a certain project
    List<PersonalInfoOutput> getAllManagersOfProject(String proj_id);
    //get all development phases of a project
    List<DevPhaseOutput> getAllPhasesOfProject(String proj_id);

    //get all members of a project
    List<UserInfoOutput> getAllMembersOfProject(String proj_id);

    List<ProjectOutput> getAllProject();

    ProjectOutput getProjectById(String id);

    Long addProject(ProjectOutput project);

    void editProjectInfo(Map<String, Object> paramMap);

    void logicalDeleteProject(String id);

    void restoreProject(String id);
}
