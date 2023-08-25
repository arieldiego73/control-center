package com.controlcenter.controlcenter.model;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjInfo {
    private Long proj_info_id;
    private int dev_type_id;
    private int client_id;
    private int proj_status_id; 
    private int proj_id;
    private int del_flag;
    private String reg_id;
    private Timestamp reg_date;
    private String update_id;
    private Timestamp update_date;
    
}
