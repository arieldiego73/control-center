package com.controlcenter.controlcenter.model;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class UserProjectInput {
    
    @NotBlank(message = "Employee ID should not be empty.")
    @Size(max = 50, message = "The Employee ID is not meeting the required length.")
    private String emp_id;

    @NotNull(message = "Project ID should not be empty.")
    @Digits(integer = 9, fraction = 0, message = "The Project ID is not meeting the required length.")
    private Long proj_id;
}
