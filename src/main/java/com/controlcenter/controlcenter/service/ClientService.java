package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.ClientInput;
import com.controlcenter.controlcenter.model.ClientOutput;

public interface ClientService {
    
    public List<ClientOutput> getAllClient();
    public ClientOutput getClientById(String id);
    public String addClient(ClientInput client, String emp_id);
    public String editClient(String id, ClientInput client, String emp_id);
    public String logicalDeleteClient(String id, String emp_id);
    public String restoreClient(String id);
}
