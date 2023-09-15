package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectStatusOutput {
    private Long proj_status_id;

    @NotBlank(message = "Project Status name should not be empty.")
    @Size(max = 150, message = "The Project Status name is invalid, it should be up to 150 characters long.")
    private String proj_status_name;

    @NotBlank(message = "Project Status description should not be empty.")
    @Size(max = 1000, message = "The Project Status description is invalid, it should be up to 1000 characters long.")
    private String proj_status_description;

    private int del_flag;

}
