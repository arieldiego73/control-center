package com.controlcenter.controlcenter.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjMemberInput {

    @NotNull
    @Size(max = 9)
    private int upid;

    @NotNull
    @Size(max = 9)
    private int role_id;
}
