package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TechnologyInput {

    @NotBlank(message = "Technology name should not be empty.")
    @Size(max = 150, message = "The technology name is not meeting the required length.")
    private String tech_name;

    @NotBlank(message = "Technology sh name should not be empty.")
    @Size(max = 50, message = "The technology sh name is not meeting the required length.")
    private String tech_sh_name;
}
