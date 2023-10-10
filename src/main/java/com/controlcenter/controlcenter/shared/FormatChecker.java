package com.controlcenter.controlcenter.shared;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

    public boolean isValidEmail(String email) {
        // Define a regular expression for a basic email pattern.
        String regex = "^[A-Za-z0-9+_.-]+@([A-Za-z0-9.-]+)$";
        
        // Create a Pattern object and compile the regex pattern.
        Pattern pattern = Pattern.compile(regex);
        
        // Create a Matcher object and match the input email against the pattern.
        Matcher matcher = pattern.matcher(email);
        
        // Return true if the email matches the pattern, false otherwise.
        return matcher.matches();
    }
}
