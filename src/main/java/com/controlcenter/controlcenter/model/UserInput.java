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
  @Size(max = 50, message = "The Employee ID is not meeting the required length.")
  private String emp_id;

  @NotBlank(message = "Username should not be empty.")
  @Size(max = 20, message = "The username is not meeting the required length.")
  private String username;

  @NotBlank(message = "Password should not be empty.")
  @Size(max = 255, message = "The password is not meeting the required length.")
  private String password;
  
  @NotBlank(message = "POsitin ID should not be empty.")
  @Digits(integer = 9, fraction = 0, message = "The Position ID is not meeting the required length.")
  private Integer position_id;

  @NotBlank(message = "Department ID should not be empty.")
  @Digits(integer = 9, fraction = 0, message = "The Department ID is not meeting the required length.")
  private Integer dept_id;

  @NotBlank(message = "Section ID should not be empty.")
  @Digits(integer = 9, fraction = 0, message = "The Section ID is not meeting the required length.")
  private Integer section_id;

  @NotBlank(message = "Status Code should not be empty.")
  @Size(max = 10, message = "The Status Code is not meeting the required length.")
  private String status_code;

  @NotBlank(message = "Role ID should not be empty.")
  @Digits(integer = 9, fraction = 0, message = "The Role ID is not meeting the required length.")
  private Integer role_id;

  @NotBlank(message = "img_src should not be empty.")
  @Size(max = 255, message = "The img_src is not meeting the required length.")
  private String img_src;
}
