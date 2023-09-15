package com.controlcenter.controlcenter.model;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjInfoInput {

    //@NotNull(message = "Development Type ID should not be empty.")
    @Digits(integer = 9, fraction = 0, message = "The Development Type ID is invalid, it should be up to 9 digits long.")
    private Long dev_type_id;

    @NotNull(message = "Client ID should not be empty.")
    @Digits(integer = 9, fraction = 0, message = "The Client ID is invalid, it should be up to 9 digits long.")
    private Long client_id;

    @NotNull(message = "roject Status ID should not be empty.")
    @Digits(integer = 9, fraction = 0, message = "The Project Status ID is invalid, it should be up to 9 digits long.")
    private Long proj_status_id; 

    @NotNull(message = "Project ID should not be empty.")
    @Digits(integer = 9, fraction = 0, message = "The Project ID is invalid, it should be up to 9 digits long.")
    private Long proj_id;
}
