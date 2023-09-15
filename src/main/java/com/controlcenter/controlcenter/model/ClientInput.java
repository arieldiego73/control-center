package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientInput {

    @NotBlank(message = "Client name should not be empty.")
    @Size(max = 150, message = "The Client name is invalid, it should be up to 150 characters long.")
    private String client_name;

    @NotBlank(message = "Client short name should not be empty.")
    @Size(max = 50, message = "The Client short name is invalid, it should be up to 50 characters long.")
    private String client_sh_name;
}
