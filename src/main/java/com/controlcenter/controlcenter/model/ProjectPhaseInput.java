package com.controlcenter.controlcenter.model;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectPhaseInput {

    @NotNull(message = "Development Phase ID should not be empty.")
    @Digits(integer = 9, fraction = 0, message =  "The Development Phase ID is invalid, it should be up to 9 digits long.")
    private Long dev_phase_id;

    @NotNull(message = "Project ID should not be empty.")
    @Digits(integer = 9, fraction = 0, message = "The Project ID is invalid, it should be up to 9 digits long.")
    private Long proj_id;
}
