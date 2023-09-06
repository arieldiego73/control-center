package com.controlcenter.controlcenter.shared;

import java.util.Set;

import javax.validation.ConstraintViolation;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ErrorHandler {

    @Bean
    public <T> String getErrors(Set<ConstraintViolation<T>> errors) {
        StringBuilder errorMessage = new StringBuilder("Error Message/s:\n");
                //loop all the errors encountered then compile them into a string:
                for (ConstraintViolation<T> violation : errors) {
                    errorMessage.append(violation.getMessage()).append("\n");
                }
            return errorMessage.toString();
    }
}
