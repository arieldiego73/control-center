package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusInput {

    @NotBlank(message = "Status code should not be empty.")
    @Size(max = 10, message = "The Status Code is invalid, it should be up to 10 characters long.")
    private String status_code;

    @NotBlank(message = "Status name should not be empty.")
    @Size(max = 150, message = "The Status name is invalid, it should be up to 150 characters long.")
    private String status_name;

    @NotBlank(message = "Status description should not be empty.")
    @Size(max = 1000, message = "The Status description is invalid, it should be up to 1000 characters long.")
    private String status_desc;
}
