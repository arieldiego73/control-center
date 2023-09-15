package com.controlcenter.controlcenter.model;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SectionInput {

    @NotBlank(message = "Department name should not be empty.")
    @Size(max = 150, message = "The Department name is invalid, it should be up to 150 characters long.")
    private String section_name;

    @NotBlank(message = "Department short name should not be empty.")
    @Size(max = 50, message = "The Department short name is invalid, it should be up to 50 characters long.")
    private String section_sh_name;

    @NotNull(message = "Business Unit ID should not be empty")
    @Digits(integer = 9, fraction = 0, message = "The Business Unit ID is invalid, it should be up to 9 digits long.")
    private Long dept_id;

    @NotBlank(message = "Department description should not be empty.")
    @Size(max = 1000, message = "The Department description is invalid, it should be up to 1000 characters long.")
    private String section_desc;
}
