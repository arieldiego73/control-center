package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DevTypeInput {

    @NotNull
    @Size(max = 150)
    private String dev_type_name;

    @NotNull
    @Size(max = 50)
    private String dev_type_sh_name;
}
