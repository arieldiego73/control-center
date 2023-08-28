package com.controlcenter.controlcenter.model;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectTechnology {
    private Long proj_tech_id;
    private int tech_id; //fk from technology tbl
    private int proj_id; //fk from project tbl
    private int del_flag;
    private String reg_id;
    private Timestamp reg_date;
    private String update_id;
    private Timestamp update_date;
}
