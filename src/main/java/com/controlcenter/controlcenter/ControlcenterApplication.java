package com.controlcenter.controlcenter;

import org.apache.ibatis.type.MappedTypes;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.controlcenter.controlcenter.model.User;

@SpringBootApplication
@MappedTypes(User.class)
@MapperScan("com.controlcenter.controlcenter.dao")
public class ControlcenterApplication {

	public static void main(String[] args) {
		SpringApplication.run(ControlcenterApplication.class, args);
	}

}
