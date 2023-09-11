package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.ClientDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.ClientInput;
import com.controlcenter.controlcenter.model.ClientOutput;
import com.controlcenter.controlcenter.service.ClientService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class ClientServiceImpl implements ClientService{
    
    @Autowired
    public ClientDao clientDao;

    @Autowired 
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    @Override
    public List<ClientOutput> getAllClient() {
        return clientDao.getAllClient();
    }

    @Override
    public ClientOutput getClientById(Long id){
        return clientDao.getClientById(id);
    }

    @Override
    public String addClient(ClientInput client) {

        try {
            clientDao.addClient(client);
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); //current logged user dapat
            activityLogInput.setLog_desc("Added a client.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);
            return "Client Added Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editClient(Long id, ClientInput client) {
        // try {
        //     // ClientOutput data = clientDao.getClientById(id);
        //     // data.setClient_id(data.getClient_id());
        //     // data.setDel_flag(data.getDel_flag());
        //     // if(data.getDel_flag() > 0 || data.getClient_id() != id) {
        //     //     return "Client does not exist.";
        //     // } else {
        //         Map<String, Object> paramMap = new HashMap<>();

        //         paramMap.put("id", id);
        //         paramMap.put("client", client);

        //         clientDao.editClient(paramMap);

        //         return "Client Edited Successfully.";
        //     // }
        // } catch (Exception e) {
        //     return e.getMessage();
        // }
        ClientOutput data = clientDao.getClientById(id);

        if(data != null) {
            if( data.getDel_flag() == 1) {
                return "Client with id of " + id + " has already been deleted";
            } else {
                Map<String, Object> paramMap = new HashMap<>();

                paramMap.put("id", id);
                paramMap.put("client", client);

                clientDao.editClient(paramMap);

                return "Client Edited Successfully.";
            }
        } else {
            return "Client with id of " + id + " cannot be found";
        }
    }

    @Override
    public String logicalDeleteClient(Long id) {
        ClientOutput client = clientDao.getClientById(id);
        
        if(client != null) {
            if(client.getDel_flag() == 1) {
                return "Client with id of " + id + " has already been deleted";
            } else {
                clientDao.logicalDeleteClient(id);
                return "Client Deleted Successfully";
            }
        } else {
            return "Client with id of " + id + " cannot be found";
        }
    }

    @Override
    public String restoreClient(Long id) {
        ClientOutput client = clientDao.getClientById(id);
        if(client != null) {
            if(client.getDel_flag() == 0) {
                return "Client with id of " + id + " is not yet deleted";
            } else {
                clientDao.restoreClient(id);
                return "Client Restored Successfully";
            }
        } else {
            return "Client with id of " + id + " cannot be found";
        }
    }
}
