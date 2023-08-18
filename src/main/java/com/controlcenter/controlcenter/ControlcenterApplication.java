package com.controlcenter.controlcenter;

import com.controlcenter.controlcenter.model.User;
import org.apache.ibatis.type.MappedTypes;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
@MappedTypes(User.class)
@MapperScan("com.controlcenter.controlcenter.dao")
public class ControlcenterApplication {

  public static void main(String[] args) {
    SpringApplication.run(ControlcenterApplication.class, args);
  }

  @Bean
  public FilterRegistrationBean<CorsFilter> corsFilter() {
    CorsConfiguration corsConfig = new CorsConfiguration();
    corsConfig.addAllowedOrigin("http://localhost:3000"); // Replace with your allowed origin
    corsConfig.addAllowedMethod("*"); // Allow all HTTP methods
    corsConfig.addAllowedHeader("*"); // Allow all headers
    corsConfig.setAllowCredentials(true); // Allow sending credentials

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfig); // Apply to all paths

    FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(
      new CorsFilter(source)
    );
    bean.setOrder(0); // Set the filter order
    return bean;
  }
}
