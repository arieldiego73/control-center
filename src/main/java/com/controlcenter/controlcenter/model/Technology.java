package com.controlcenter.controlcenter.model;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Technology {
    private Long tech_id;
    private String tech_name;
    private String tech_sh_name;
    private int del_flag;
    private String reg_id;
    private Timestamp reg_date;
    private String update_id;
    private Timestamp update_date;
}
