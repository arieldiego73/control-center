package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectTechnologyInput {
    private int tech_id; //fk from technology tbl
    private int proj_id; //fk from project tbl
}
