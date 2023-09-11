package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DevPhaseInput {

    @NotBlank(message = "Development Phase name should not be empty.")
    @Size(max = 150, message = "The Development Phase name is invalid, it should be up to 150 characters long.")
    private String dev_phase_name;

    @NotBlank(message = "Development Phase short name should not be empty.")
    @Size(max = 50, message = "The Development Phase short name is invalid, it should be up to 50 characters long.")
    private String dev_phase_sh_name;
}
