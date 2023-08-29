package com.controlcenter.controlcenter.model;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectPhase {
    private Long proj_phase_id;
    private int dev_phase_id;
    private int proj_id;
    private int del_flag;
    private String reg_id;
    private Timestamp reg_date;
    private String update_id;
    private Timestamp update_date;
}
