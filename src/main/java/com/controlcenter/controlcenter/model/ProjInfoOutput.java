package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjInfoOutput {
    private Long proj_info_id;
    private int dev_type_id;
    private int client_id;
    private int proj_status_id; 
    private int proj_id;
    private int del_flag;
}
