package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProjectInput {

    @NotBlank(message = "Employee ID should not be empty.")
    @Size(max = 50, message = "The Employee ID is not meeting the required length.")
    private String emp_id;

    @NotBlank(message = "Project ID should not be empty.")
    @Size(max = 9, message = "The Project ID is not meeting the required length.")
    private int proj_id;
}
