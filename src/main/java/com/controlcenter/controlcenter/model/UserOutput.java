package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserOutput {

  private String emp_id;

  @NotBlank(message = "Username should not be empty.")
  @Size(max = 20, message = "The Username is invalid, it should be up to 20 characters long.")
  private String username;

  @NotBlank(message = "Password should not be empty.")
  @Size(max = 255, message = "The Password is invalid, it should be up to 255 characters long.")
  private String password;
  
  private Long position_id;

  private Long dept_id;

  private Long section_id;

  private String status_code;

  // private Long role_id;
  
  private String img_src;
}
