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
    @Size(max = 150, message = "Section name is not meeting the required length.")
    private String section_name;

    @NotNull(message = "Department ID should not be empty")
    @Digits(integer = 9, fraction = 0, message = "The Department ID is invalid, it should be up to 1 digit long.")
    private Long dept_id;
}
