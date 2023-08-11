package com.controlcenter.controlcenter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.controlcenter.controlcenter.dao")
public class ControlcenterApplication {

	public static void main(String[] args) {
		SpringApplication.run(ControlcenterApplication.class, args);
	}

}
