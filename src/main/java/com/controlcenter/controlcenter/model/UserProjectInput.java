package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProjectInput {

    @NotNull
    @Size(max = 50)
    private String emp_id;

    @NotNull
    private int proj_id;
}
