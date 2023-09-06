package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DevTypeInput {

    @NotBlank(message = "Development Type name should not be empty.")
    @Size(max = 150, message = "The Development Type short name is not meeting the required length.")
    private String dev_type_name;

    @NotBlank(message = "Development Type short name should not be empty.")
    @Size(max = 50, message = "The Development Type short name is not meeting the required length.")
    private String dev_type_sh_name;
}
