package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectStatusInput {

    @NotNull
    @Size(max = 9)
    private Long proj_status_id;

    @NotNull
    @Size(max = 150)
    private String proj_status_name;

    @NotNull
    private String proj_status_description;
}
