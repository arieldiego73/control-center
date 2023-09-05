package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjInfoInput {

    @NotNull
    @Size(max = 9)
    private int dev_type_id;

    @NotNull
    @Size(max = 9)
    private int client_id;

    @NotNull
    @Size(max = 9)
    private int proj_status_id; 

    @NotNull
    @Size(max = 9)
    private int proj_id;
}
