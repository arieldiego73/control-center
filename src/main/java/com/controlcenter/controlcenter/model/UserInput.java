package com.controlcenter.controlcenter.model;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInput {

  //User Model
  @NotBlank(message = "Employee ID should not be empty.")
  @Size(max = 50, message = "The Employee ID is invalid, it should be up to 50 characters long.")
  private String emp_id;

  @NotBlank(message = "Username should not be empty.")
  @Size(max = 20, message = "The Username is invalid, it should be up to 20 characters long.")
  private String username;

  @NotBlank(message = "Password should not be empty.")
  @Size(max = 255, message = "The Password is invalid, it should be up to 255 characters long.")
  private String password;
  
  @NotBlank(message = "Position ID should not be empty.")
  @Digits(integer = 9, fraction = 0, message = "The Position ID is invalid, it should be up to 9 digits long.")
  private Long position_id;

  @NotBlank(message = "Department ID should not be empty.")
  @Digits(integer = 9, fraction = 0, message = "The Department ID is invalid, it should be up to 9 digits long.")
  private Long dept_id;

  @NotBlank(message = "Section ID should not be empty.")
  @Digits(integer = 9, fraction = 0, message = "The Section ID is invalid, it should be up to 9 digits long.")
  private Long section_id;

  @NotBlank(message = "Status Code should not be empty.")
  @Size(max = 10, message = "The Status Code is invalid, it should be up to 10 characters long.")
  private String status_code;

  // @NotBlank(message = "Role ID should not be empty.")
  // @Digits(integer = 9, fraction = 0, message = "The Role ID is invalid, it should be up to 9 digits long.")
  // private Long role_id;

  @NotBlank(message = "img_src should not be empty.")
  @Size(max = 255, message = "The Image source is invalid, it should be up to 255 characters long.")
  private String img_src;
}
