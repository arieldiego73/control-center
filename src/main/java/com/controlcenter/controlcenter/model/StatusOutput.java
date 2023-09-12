package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class StatusOutput {
    private String status_code;

    @NotBlank(message = "Status name should not be empty.")
    @Size(max = 150, message = "The Status name is invalid, it should be up to 150 characters long.")
    private String status_name;
    
    private int del_flag;
}
