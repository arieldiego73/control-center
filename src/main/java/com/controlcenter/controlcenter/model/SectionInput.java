package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SectionInput {

    @NotNull
    @Size(max = 150)
    private String section_name;

    @NotNull
    @Size(max = 9)
    private int dept_id;
}
