package com.controlcenter.controlcenter.controller;

import java.util.List;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlcenter.controlcenter.model.ClientInput;
import com.controlcenter.controlcenter.model.ClientOutput;
import com.controlcenter.controlcenter.service.ClientService;
import com.controlcenter.controlcenter.shared.ErrorHandler;

@RestController
@RequestMapping("/client")
public class ClientController{
    
    @Autowired
    public ClientService clientService;

    @Autowired
    private ErrorHandler errorHandler;

    @GetMapping("/all")
    public List<ClientOutput> getAllClient() {
        return clientService.getAllClient();
    }

    @GetMapping("/client-id/{id}")
    public ClientOutput getClientById(String id) {
        return clientService.getClientById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addClient(@RequestBody ClientInput client) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<ClientInput>> errors = validator.validate(client);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                return ResponseEntity.status(200).body(clientService.addClient(client));
            }
    }

    @PutMapping("/edit/{id}") 
    public ResponseEntity<String> editClient(@PathVariable String id,@RequestBody ClientInput client) {
        //For Validation
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        Set<ConstraintViolation<ClientInput>> errors = validator.validate(client);
            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            }else{
                return ResponseEntity.status(200).body(clientService.editClient(id, client));
            }
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
