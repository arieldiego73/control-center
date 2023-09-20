package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectPhaseOutput {
    private Long proj_phase_id;
    private Long dev_phase_id;
    private Long proj_id;
    private int del_flag;
}
