package com.controlcenter.controlcenter.model;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserTable {
  private String emp_id;
  private String username;
  private String fname;
  private String lname;
  private String position_sh_name;
  private String email;
  private String section_name;
  private String dept_name;
  private Timestamp reg_date;
  private int del_flag;
}
