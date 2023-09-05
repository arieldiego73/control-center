package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusInput {

    @NotNull
    @Size(max = 10)
    private String status_code;

    @NotNull
    @Size(max = 150)
    private String status_name;
}
