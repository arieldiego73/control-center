package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MultiRoleInput {

    @NotNull
    @Size(max = 50)
    private String emp_id;

    @NotNull
    @Size(max = 9)
    private int role_id;
}
