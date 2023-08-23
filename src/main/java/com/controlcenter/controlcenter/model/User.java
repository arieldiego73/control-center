package com.controlcenter.controlcenter.model;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {

  //User Model
  private Long emp_id;
  private String username;
  private String password;
  private Long position_id;
  private Long dept_id;
  private Long section_id;
  private String status_code;
  private Long role_id;
  private String img_src;
  private int del_flag;
  private String reg_id;
  private Timestamp reg_date;
  private String update_id;
  private Timestamp update_date;

  
}
