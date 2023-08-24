package com.controlcenter.controlcenter.model;

import java.sql.Date;
import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Project {
    private Long proj_id;
    private String proj_name;
    private String proj_code;
    private String proj_description;
    private Date start_date;
    private Date end_date;
    private int del_flag;
    private String reg_id;
    private Timestamp reg_date;
    private String update_id;
    private Timestamp update_date;
}