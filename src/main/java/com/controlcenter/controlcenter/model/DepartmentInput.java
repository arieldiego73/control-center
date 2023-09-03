package com.controlcenter.controlcenter.model;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class DepartmentInput {
    @NonNull
    private String dept_name;
}
