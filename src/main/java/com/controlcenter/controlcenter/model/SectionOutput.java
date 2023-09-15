package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class SectionOutput {
    private Long section_id;
    private String section_name;
    private String section_sh_name;
    private int dept_id;
    private int del_flag;
}
