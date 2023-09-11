package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientOutput {
    private Long client_id;
    private String client_name;
    private String client_sh_name;
    private int del_flag;
}
