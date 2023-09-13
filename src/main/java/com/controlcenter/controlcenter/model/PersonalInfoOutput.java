package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonalInfoOutput {
    private Long pid;
    private String emp_id;

    @NotBlank(message = "First Name should not be empty.")
    @Size(max = 150, message = "The First Name is invalid, it should be up to 150 characters long.")
    private String fname;

    @NotBlank(message = "Last Name should not be empty.")
    @Size(max = 150, message = "The Last Name is invalid, it should be up to 150 characters long.")
    private String lname;

    @Size(max = 150, message = "The Middle Name is invalid, it should be up to 150 characters long.")
    private String mname;

    @NotBlank(message = "Email should not be empty.")
    @Size(max = 150, message = "The Email is invalid, it should be up to 150 characters long.")
    private String email;

    private int del_flag;
}
