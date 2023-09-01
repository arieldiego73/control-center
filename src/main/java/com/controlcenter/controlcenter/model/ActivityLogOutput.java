package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActivityLogOutput {
    private Long log_id;
    private String username;
    private String log_desc;
    private String log_date;
}
