package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentInput {

    @NotBlank(message = "Department name should not be empty.")
    @Size(max = 150, message = "The Department name is not meeting the required length.")
    private String dept_name;
}
