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

    @NotBlank(message = "First name should not be empty.")
    @Size(max = 150, message = "The First Name is not meeting the required length.")
    private String fname;

    @NotBlank(message = "Last name should not be empty.")
    @Size(max = 150, message = "The Last Name is not meeting the required length.")
    private String lname;

    // @NotBlank(message = "Middle name should not be empty.") not all people have this
    @Size(max = 150, message = "The Middle Name is not meeting the required length.")
    private String mname;

    // @NotBlank(message = "Email should not be empty.")
    @Size(max = 150, message = "The Email is not meeting the required length.")
    private String email;
}
