package com.controlcenter.controlcenter.model;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjMemberInput {

    @NotNull(message = "User Project ID should not be empty.")
    @Digits(integer = 9, fraction = 0, message = "The User Project ID is invalid, it should be up to 9 digits long.")
    private Long upid;

    @NotNull(message = "Role ID should not be empty")
    @Digits(integer = 9, fraction = 0, message = "The Role ID is invalid, it should be up to 9 digits long.")
    private Long role_id;
}
