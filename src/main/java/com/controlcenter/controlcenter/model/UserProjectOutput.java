package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProjectOutput {
    private Long upid;
    private String emp_id;
    private int proj_id;
    private int del_flag;
}
