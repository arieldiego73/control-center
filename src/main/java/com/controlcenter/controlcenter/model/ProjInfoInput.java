package com.controlcenter.controlcenter.model;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjInfoInput {

    @NotNull(message = "Dev type ID should not be empty.")
    @Digits(integer = 9, fraction = 0, message = "The dev type id is not meeting the required length.")
    private Integer dev_type_id;

    @NotNull(message = "Client ID should not be empty.")
    @Digits(integer = 9, fraction = 0, message = "The Client ID is not meeting the required length.")
    private Integer client_id;

    @NotNull(message = "roject Status ID should not be empty.")
    @Digits(integer = 9, fraction = 0, message = "The Project Status ID is not meeting the required length.")
    private Integer proj_status_id; 

    @NotNull(message = "Project ID should not be empty.")
    @Digits(integer = 9, fraction = 0, message = "The Project ID is not meeting the required length.")
    private Integer proj_id;
}
