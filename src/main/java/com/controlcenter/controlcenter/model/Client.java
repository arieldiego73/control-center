package com.controlcenter.controlcenter.model;

import java.sql.Time;
import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Client {
    private Long client_id;
    private String client_name;
    private String client_sh_name;
    private int del_flag;
    private String reg_id;
    private Timestamp reg_date;
    private String update_id;
    private Timestamp update_date;
}
