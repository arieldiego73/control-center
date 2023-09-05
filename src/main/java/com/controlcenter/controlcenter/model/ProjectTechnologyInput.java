package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectTechnologyInput {

    @NotNull
    @Size(max = 9)
    private int tech_id; //fk from technology tbl

    @NotNull
    @Size(max = 9)
    private int proj_id; //fk from project tbl
}
