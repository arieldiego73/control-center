package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInput {

  //User Model
  private String emp_id;
  private String username;
  private String password;
  private int position_id;
  private int dept_id;
  private int section_id;
  private String status_code;
  private int role_id;
  private String img_src;
}
