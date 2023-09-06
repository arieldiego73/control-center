package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonalInfoInput {

    @NotBlank(message = "Employee ID should not be empty.")
    @Size(max = 50, message = "The Employee ID is not meeting the required length.")
    private String emp_id;

    @Size(max = 150, message = "The First Name is not meeting the required length.")
    private String fname;

    @Size(max = 150, message = "The Last Name is not meeting the required length.")
    private String lname;

    @Size(max = 150, message = "The Middle Name is not meeting the required length.")
    private String mname;

    @Size(max = 150, message = "The Email is not meeting the required length.")
    private String email;
}
