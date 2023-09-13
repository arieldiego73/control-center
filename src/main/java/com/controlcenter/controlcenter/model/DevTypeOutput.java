package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DevTypeOutput {
    private Long dev_type_id;
    private String dev_type_name;
    private String dev_type_sh_name;
    private int del_flag;
}
