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
    private Long position_id;
    private Long dept_id;
    private Long section_id;
    private String status_code;
    private Long role_id;
    private String img_src;
}
