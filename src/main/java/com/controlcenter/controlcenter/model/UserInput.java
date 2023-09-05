package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInput {

  //User Model
  @NotNull
  @Size(max = 50)
  private String emp_id;

  @NotNull
  @Size(max = 20)
  private String username;

  @NotNull
  @Size(max = 255)
  private String password;
  
  @NotNull
  private int position_id;

  @NotNull
  private int dept_id;

  @NotNull
  private int section_id;

  @NotNull
  @Size(max = 10)
  private String status_code;

  @NotNull
  private int role_id;

  @NotNull
  @Size(max = 255)
  private String img_src;
}
