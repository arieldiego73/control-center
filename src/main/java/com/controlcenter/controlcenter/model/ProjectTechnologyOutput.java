package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectTechnologyOutput {
    private Long proj_tech_id;
    private Long tech_id; //fk from technology tbl
    private Long proj_id; //fk from project tbl
    private int del_flag;
}
