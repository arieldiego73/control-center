package com.controlcenter.controlcenter.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class ClientOutput {
    private Long client_id;
    private String client_name;
    private String client_sh_name;
    private int del_flag;
}
