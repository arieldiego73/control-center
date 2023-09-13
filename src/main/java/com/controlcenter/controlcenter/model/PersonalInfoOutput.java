package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonalInfoOutput {
    private Long pid;
    private String emp_id;
    private String fname;
    private String lname;
    private String mname;
    private String email;
    private int del_flag;
}
