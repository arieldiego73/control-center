package com.controlcenter.controlcenter.model;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectManagerInput {
    private Long pmid;

    @NotNull(message = "Role ID should not be empty.")
    @Digits(integer = 9, fraction = 0, message = "The Role ID is invalid, it should be up to 9 digits long.")
    private Long proj_id;

    @NotBlank(message = "Employee ID should not be empty.")
    @Size(max = 50, message = "The Employee ID is invalid, it should be up to 50 characters long.")
    private String emp_id;
}
