package com.controlcenter.controlcenter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.model.Client;
import com.controlcenter.controlcenter.service.ClientService;

@RestController
@RequestMapping("/client")
public class ClientController {
    
    @Autowired
    public ClientService clientService;

    @GetMapping("/all")
    public List<Client> getAllClient() {
        return clientService.getAllClient();
    }
}
