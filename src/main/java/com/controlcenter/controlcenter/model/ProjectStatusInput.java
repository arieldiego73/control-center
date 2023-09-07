package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectStatusInput {

    @NotBlank(message = "Project Status name should not be empty.")
    @Size(max = 150, message = "Project Status name is not meeting the required length.")
    private String proj_status_name;

    @NotBlank(message = "prject status description should not be empty.")
    private String proj_status_description;
}
