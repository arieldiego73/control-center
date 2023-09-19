package com.controlcenter.controlcenter.model;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectTable {
    private Long proj_id;
    private String proj_name;
    private String client_name;
    private Date start_date;
    private Date end_date;
    private String dev_type_name;
    private int members;
    private String proj_status_name;
}
