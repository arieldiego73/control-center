package com.controlcenter.controlcenter.service;

import java.util.List;

import com.controlcenter.controlcenter.model.ClientInput;
import com.controlcenter.controlcenter.model.ClientOutput;

public interface ClientService {
    
    public List<ClientOutput> getAllClient();
    public ClientOutput getClientById(Long id);
    public String addClient(ClientInput client);
    public String editClient(Long id, ClientInput client);
    public String logicalDeleteClient(Long id);
    public String restoreClient(Long id);
}
