package com.controlcenter.controlcenter.shared;

import java.util.List;

public class ValidationResponse <E>{
    public boolean success;
    public List<E> errors;

    public ValidationResponse(boolean success, List<E> errors) {
        this.success = success;
        this.errors = errors;
    }

    public boolean isSuccess() {
        return success;
    }

    public List<E> getErrors() {
        return errors;
    }
}
