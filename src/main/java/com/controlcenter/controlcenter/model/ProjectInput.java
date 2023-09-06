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
    @Size(max = 100)
    private String proj_name;

    @NotBlank(message = "Project code should not be empty.")
    @Size(max = 15)
    private String proj_code;

    @NotBlank(message = "Project description should not be empty.")
    private String proj_description;

    @NotNull(message = "Start date should not be empty.")
    private Date start_date;

    @NotNull(message = "End date should not be empty.")
    private Date end_date;
}
