package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonalInfoInput {

    @NotNull
    @Size(max = 50)
    private String emp_id;

    @Size(max = 150)
    private String fname;

    @Size(max = 150)
    private String lname;

    @Size(max = 150)
    private String mname;

    @Size(max = 150)
    private String email;
}
