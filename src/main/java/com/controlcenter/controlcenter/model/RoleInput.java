package com.controlcenter.controlcenter.model;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleInput {

    @NotBlank(message = "Role Title should not be empty.")
    @Size(max = 100, message = "The Role Title is not meeting the required length.")
    private String title;

    @NotBlank(message = "Role short name should not be empty.")
    @Size(max = 50, message = "The Role short name is not meeting the required length.")
    private String role_sh_name;

    @NotNull(message = "Role user level should not be empty.")
    @Digits(integer = 1, fraction = 0, message = "The Role user lever is invalid, it should be up to 1 digit long.")
    private int role_user_level;
}
