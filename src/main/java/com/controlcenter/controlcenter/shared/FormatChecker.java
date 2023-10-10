package com.controlcenter.controlcenter.shared;

import org.springframework.stereotype.Service;

@Service
public class FormatChecker {
    public boolean containsNumbers(String input) {
        for (char c : input.toCharArray()) {
            if (Character.isDigit(c)) {
                return true;
            }
        }
        return false;
    }

    public boolean containsLetters(String input) {
        for (char c : input.toCharArray()) {
            if (!Character.isDigit(c)) {
                return true;
            }
        }
        return false;
    }
}
