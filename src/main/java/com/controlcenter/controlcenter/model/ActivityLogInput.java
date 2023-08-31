package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActivityLogInput {
    private String emp_id;
    private String username;
    private String log_desc;
    private Long log_date;
}
