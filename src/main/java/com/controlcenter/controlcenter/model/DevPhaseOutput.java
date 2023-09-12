package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DevPhaseOutput {
    private Long dev_phase_id;
    private String dev_phase_name;
    private String dev_phase_sh_name;
    private int del_flag;
}
