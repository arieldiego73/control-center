package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PositionInput {

    @NotBlank(message = "Position name should not be empty.")
    @Size(max = 150, message = "The Position name is not valid, it should be up to 150 characters long.")
    private String position_name;

    @NotBlank(message = "Position short name should not be empty.")
    @Size(max = 50, message = "The Position short name is not valid, it should be up to 50 characters long.")
    private String position_sh_name;

    @NotBlank(message = "Position description should not be empty.")
    @Size(max = 1000, message = "The Position description is invalid, it should be up to 1000 characters long.")
    private String position_desc;
}
