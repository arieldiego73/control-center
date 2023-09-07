package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Account {
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
}
