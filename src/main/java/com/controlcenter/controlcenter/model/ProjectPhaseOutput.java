package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectPhaseOutput {
    private Long proj_phase_id;
    private int dev_phase_id;
    private int proj_id;
    private int del_flag;
}
