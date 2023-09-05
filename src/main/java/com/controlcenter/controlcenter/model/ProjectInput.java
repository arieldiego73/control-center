package com.controlcenter.controlcenter.model;

import java.sql.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectInput {

    @NotNull
    @Size(max = 100)
    private String proj_name;

    @NotNull
    @Size(max = 15)
    private String proj_code;

    @NotNull
    private String proj_description;

    @NotNull
    private Date start_date;

    @NotNull
    private Date end_date;
}
