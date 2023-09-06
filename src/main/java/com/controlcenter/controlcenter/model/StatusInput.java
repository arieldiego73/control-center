package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusInput {

    @NotBlank(message = "Status code should not be empty.")
    @Size(max = 10, message = "The Status Code is not meeting the required length.")
    private String status_code;

    @NotBlank(message = "Status name should not be empty.")
    @Size(max = 150, message = "The Status Name is not meeting the required length.")
    private String status_name;
}
