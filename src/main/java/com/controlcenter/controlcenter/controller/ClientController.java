package com.controlcenter.controlcenter.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpSession;
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
import org.springframework.web.bind.annotation.RequestParam;
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
    public List<ClientOutput> getAllClient(HttpSession httpSession) {
        // Check if the user is authenticated 
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        if (isAuthenticated != null && isAuthenticated) {
            // User is authenticated
            return clientService.getAllClient();
        } else {
            // User is not authenticated
            return new ArrayList<>();
        }
    }

    @GetMapping("/client-id/{id}")
    public ClientOutput getClientById(@PathVariable String id, HttpSession httpSession) {
        
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            // User is authenticated
            return clientService.getClientById(id);
        } else {
            // User is not authenticated
            return null;
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addClient(@RequestBody ClientInput client, HttpSession httpSession) { 
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            // User is authenticated,  proceed with adding
            //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<ClientInput>> errors = validator.validate(client);

            //Error Handling
            if (errors.size() > 0) { //checks the errors from validator
                return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
            } else {
                String emp_id = httpSession.getAttribute("session").toString(); 
                return ResponseEntity.status(200).body(clientService.addClient(client, emp_id));
            } 
        } else {
            // User is not authenticated
                return ResponseEntity.status(401).body("Unauthorized");
            }        
    }

    @PutMapping("/edit/{id}") 
    public ResponseEntity<String> editClient(@PathVariable String id,@RequestBody ClientInput client, HttpSession httpSession) {
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            // User is authenticated,  proceed with adding
            //For Validation
            ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
            Validator validator = validatorFactory.getValidator();
            Set<ConstraintViolation<ClientInput>> errors = validator.validate(client);
                //Error Handling
                if (errors.size() > 0) { //checks the errors from validator
                    return ResponseEntity.status(400).body(errorHandler.getErrors(errors));
                }else{
                    String emp_id = httpSession.getAttribute("session").toString();
                    return clientService.editClient(id, client, emp_id);
                }
        } else {
            return ResponseEntity.status(401).body("Unauthorized");
        } 
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<String> logicalDeleteClient(@PathVariable String id, HttpSession httpSession) {
        // Check if the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated) {
            try {
                String emp_id = httpSession.getAttribute("session").toString(); 
                return ResponseEntity.ok(clientService.logicalDeleteClient(id, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/delete-multiple")
    public ResponseEntity<String> deleteMultipleClient(@RequestParam List<Long> ids, HttpSession httpSession) {
        // Check uf the user is authenticated
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");

        if (isAuthenticated != null && isAuthenticated){
            try {
                String emp_id = httpSession.getAttribute("session").toString();
            return ResponseEntity.ok().body(clientService.deleteMultipleClient(ids, emp_id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error");
            }
        } else {
            // User is not authenticated
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreClient(@PathVariable String id, HttpSession httpSession) {
        // Check if the user is authenticated before allowing access to the "/restore/{id}" endpoint
        Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isAuthenticated");
        
        if (isAuthenticated != null && isAuthenticated) {
            try {
                return ResponseEntity.ok(clientService.restoreClient(id));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Server Side Error.");
            }
        } else {
            // User is not authenticated, you can handle this case (e.g., redirect to login)
            // For simplicity, returning a 401 Unauthorized status here, but you can handle it as needed
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }
}
