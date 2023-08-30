package com.controlcenter.controlcenter.model;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectOutput {
    private Long proj_id;
    private String proj_name;
    private String proj_code;
    private String proj_description;
    private Date start_date;
    private Date end_date;
}