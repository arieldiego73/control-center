package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentOutput {
    private Long dept_id;

    @NotBlank(message = "Business Unit name should not be empty.")
    @Size(max = 150, message = "The Business Unit name is invalid, it should be up to 150 characters long.")
    private String dept_name;

    @NotBlank(message = "Business Unit short name should not be empty.")
    @Size(max = 50, message = "The Business Unit short name is invalid, it should be up to 50 characters long.")
    private String dept_sh_name;

    @NotBlank(message = "Business Unit description should not be empty.")
    @Size(max = 1000, message = "The Business Unit short name is invalid, it should be up to 1000 characters long.")
    private String dept_desc;

    private int del_flag;
}
