package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MultiRoleOutput {
    private Long user_role_id;
    private String emp_id;
    private int role_id;
    private int del_flag;
}
