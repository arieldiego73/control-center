package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentInput {

    @NotBlank(message = "Department name should not be empty.")
    @Size(max = 150, message = "The Department name is invalid, it should be up to 150 characters long.")
    private String dept_name;

    @NotBlank(message = "Department's short name should not be empty.")
    @Size(max = 50, message = "The Department short name is invalid, it should be up to 50 characters long.")
    private String dept_sh_name;
}
