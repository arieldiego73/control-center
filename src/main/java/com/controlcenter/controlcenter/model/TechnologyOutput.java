package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TechnologyOutput {
    private Long tech_id;
    private String tech_name;
    private String tech_sh_name;
    private int del_flag;
}
