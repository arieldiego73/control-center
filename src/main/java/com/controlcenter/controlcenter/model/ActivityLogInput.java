package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActivityLogInput {

    @NotNull
    @Size(max = 50)
    private String emp_id;

    @NotNull
    @Size(max = 20)
    private String username;

    @NotNull
    private String log_desc;

    @NotNull
    @Size(max = 50)
    private String log_date;
}
