package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoOutput {
  private Long emp_id;
  private String username;
  private String fname;
  private String mname;
  private String lname;
  private String position_name;
  private String email;
  private String section_name;
  private String dept_name;
  private String title;
}