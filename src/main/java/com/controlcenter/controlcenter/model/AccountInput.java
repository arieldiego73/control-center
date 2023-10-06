package com.controlcenter.controlcenter.model;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountInput {
    
    @NotBlank(message = "Employee ID should not be empty.")
    @Size(max = 50, message = "The Employee ID is invalid, it should be up to 50 characters long.")
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

    @NotBlank(message = "Username should not be empty.")
    @Size(max = 20, message = "The Username is invalid, it should be up to 20 characters long.")
    private String username;

    @NotBlank(message = "Password should not be empty.")
    @Size(max = 255, message = "The Password is invalid, it should be up to 255 characters long.")
    private String password;

    private String confirm_password;

    @NotNull(message = "Position ID should not be empty.")
    @Digits(integer = 9, fraction = 0, message = "The Position ID is invalid, it should be up to 9 digits long.")
    private Long position_id;

    @NotNull(message = "Department ID should not be empty.")
    @Digits(integer = 9, fraction = 0, message = "The Department ID is invalid, it should be up to 9 digits long.")
    private Long dept_id;

    @NotNull(message = "Section ID should not be empty.")
    @Digits(integer = 9, fraction = 0, message = "The Section ID is invalid, it should be up to 9 digits long.")
    private Long section_id;

    @NotBlank(message = "Status Code should not be empty.")
    @Size(max = 150, message = "The Status Code is invalid, it should be up to 150 characters long.")
    private String status_code;

    // @NotNull(message = "Role ID should not be empty.")
    // @Digits(integer = 9, fraction = 0, message = "The Role ID is invalid, it should be up to 9 digits long.")
    // private Long role_id;

    @Size(max = 255, message = "The Image Source is invalid, it should be up to 255 characters long.")
    private String img_src;
}
