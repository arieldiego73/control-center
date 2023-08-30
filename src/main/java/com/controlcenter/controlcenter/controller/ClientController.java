package com.controlcenter.controlcenter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/add")
    public String addClient(@RequestBody Client client) {
        return clientService.addClient(client);
    }

    @PutMapping("/edit/{id}") 
    public String editClient(@PathVariable String id,@RequestBody Client client) {
        return clientService.editClient(id, client);
    }

    @PutMapping("/delete/{id}")
    public String logicalDeleteClient(@PathVariable String id) {
        return clientService.logicalDeleteClient(id);
    }

    @PutMapping("/restore/{id}")
    public String restoreClient(@PathVariable String id) {
        return clientService.restoreClient(id);
    }
}
