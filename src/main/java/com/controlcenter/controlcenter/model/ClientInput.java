package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientInput {

    @NotBlank(message = "Client name should not be empty.")
    @Size(max = 150, message = "The length of the data entered does not reach the specified length.")
    private String client_name;

    @NotBlank(message = "Client short name should not be empty.")
    @Size(max = 50, message = "The length of the data entered does not reach the specified length.")
    private String client_sh_name;
}
