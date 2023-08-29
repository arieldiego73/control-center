package com.controlcenter.controlcenter.model;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectStatus {
    private Long proj_status_id;
    private String proj_status_name;
    private String proj_status_description;
    private int del_flag;
    private String reg_id;
    private Timestamp reg_date;
    private String update_id;
    private Timestamp update_date;
}
