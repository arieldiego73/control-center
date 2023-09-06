package com.controlcenter.controlcenter.model;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjMemberInput {

    @NotNull(message = "Up ID should not be empty.")
    @Digits(integer = 9, fraction = 0, message = "up ID is not meeting the required length.")
    private Integer upid;

    @NotNull(message = "Role ID should not be empty")
    @Digits(integer = 9, fraction = 0, message = "Role ID is not meeting the required length.")
    private Integer role_id;
}
