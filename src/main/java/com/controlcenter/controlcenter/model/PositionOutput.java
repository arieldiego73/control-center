package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PositionOutput {
    private Long position_id;
    private String position_name;
    private String position_sh_name;
    private int del_flag;
}
