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

    @NotBlank(message = "Section name should not be empty.")
    @Size(max = 150, message = "The Section name is invalid, it should be up to 150 characters long.")
    private String section_name;

    @NotBlank(message = "Section's short name should not be empty.")
    @Size(max = 50, message = "The Section short name is invalid, it should be up to 50 characters long.")
    private String section_sh_name;

    @NotNull(message = "Department ID should not be empty")
    @Digits(integer = 9, fraction = 0, message = "The Department ID is invalid, it should be up to 9 digits long.")
    private Long dept_id;
}
