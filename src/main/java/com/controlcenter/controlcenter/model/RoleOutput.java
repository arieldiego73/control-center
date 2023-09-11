package com.controlcenter.controlcenter.model;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleOutput {
    
    private Long role_id;
    private String title;
    private String role_sh_name;
    private int role_user_level;
    private int del_flag;
}
