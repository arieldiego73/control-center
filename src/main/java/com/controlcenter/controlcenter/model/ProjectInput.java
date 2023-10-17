package com.controlcenter.controlcenter.model;

import java.sql.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectInput {
    @NotBlank(message = "Project name should not be empty.")
    @Size(max = 100, message = "The Project name is invalid, it should be up to 100 characters long.")
    private String proj_name;

    @NotBlank(message = "Project code should not be empty.")
    @Size(max = 15, message = "The Project code is invalid, it should be up to 15 characters long.")
    private String proj_code;

    // @NotBlank(message = "Project description should not be empty.")
    @Size(max = 1000, message = "The Project description is invalid, it should be up to 1000 characters long.")
    private String proj_description;

    @NotNull(message = "Start date should not be empty.")
    private Date start_date;

    @NotNull(message = "End date should not be empty.")
    private Date end_date;
}
