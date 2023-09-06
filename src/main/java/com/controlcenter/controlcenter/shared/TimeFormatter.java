package com.controlcenter.controlcenter.shared;

import java.sql.Date;
import java.text.SimpleDateFormat;

import org.springframework.stereotype.Service;

@Service
public class TimeFormatter {
    public String formatTime(Long timeToFormat) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String formattedDate = sdf.format(new Date(timeToFormat));
        return formattedDate;
    }
}
