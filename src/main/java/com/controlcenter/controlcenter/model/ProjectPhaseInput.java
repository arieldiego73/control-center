package com.controlcenter.controlcenter.model;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectPhaseInput {

    @NotNull
    @Size(max = 9)
    private int dev_phase_id;

    @NotNull
    @Size(max = 9)
    private int proj_id;
}
