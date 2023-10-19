package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {
    private UserOutput userOutput;
    private UserInfoOutput userInfoOutput;
    private String errorMessage;
}
