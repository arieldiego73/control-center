package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserStatusGraph {
    private String status_code;
    private String status_name;
    private String year;
    private String month;
    private Integer total;
}
