package com.controlcenter.controlcenter.model;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Account {
    private Long pid;
    private String emp_id;
    private String fname;
    private String lname;
    private String mname;
    private String email;
    private String username;
    private String password;
    private int position_id;
    private int dept_id;
    private int section_id;
    private String status_code;
    private int role_id;
    private String img_src;
    private int del_flag;
    private String reg_id;
    private Timestamp reg_date;
    private String update_id;
    private Timestamp update_date;
}
