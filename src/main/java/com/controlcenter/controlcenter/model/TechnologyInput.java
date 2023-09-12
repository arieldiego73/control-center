package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TechnologyInput {

    @NotBlank(message = "Technology name should not be empty.")
    @Size(max = 150, message = "The Technology name is invalid, it should be up to 150 characters long.")
    private String tech_name;

    @NotBlank(message = "Technology short name should not be empty.")
    @Size(max = 50, message = "The Technology short name is invalid, it should be up to 50 characters long.")
    private String tech_sh_name;
}
