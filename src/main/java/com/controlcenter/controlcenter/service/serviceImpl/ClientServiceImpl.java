package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.ArrayList;
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

    List<ClientOutput> clientList = new ArrayList<>();

    @Override
    public List<ClientOutput> getAllClient() {
        return clientDao.getAllClient();
    }

    @Override
    public ClientOutput getClientById(String id){
        return clientDao.getClientById(id);
    }

    @Override
    public String addClient(ClientInput client, String emp_id) {

        try {
            clientDao.addClient(client);

            //Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id(emp_id); //current logged user dapat
            activityLogInput.setLog_desc("Added '" + client.getClient_name() + "' client.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);
            return "Client added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editClient(String id, ClientInput client, String emp_id) {
        ClientOutput data = clientDao.getClientById(id);

        if(data != null) {
            if( data.getDel_flag() == 1) {
                return "Client with the ID " + id + " has already been deleted.";
            } else {
                Map<String, Object> paramMap = new HashMap<>();

                paramMap.put("id", id);
                paramMap.put("client", client);

                clientDao.editClient(paramMap);

                //Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); //current logged user dapat
                activityLogInput.setLog_desc("Edited '" + client.getClient_name() + "' client.");

                Long currentTimeMillis = System.currentTimeMillis();
                //add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Client edited successfully.";
            }
        } else {
            return "Client with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String logicalDeleteClient(String id, String emp_id) {
        ClientOutput client = clientDao.getClientById(id);
        
        if(client != null) {
            if(client.getDel_flag() == 1) {
                return "Client with the ID " + id + " has already been deleted.";
            } else {
                clientDao.logicalDeleteClient(id);

                //Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); //current logged user dapat
                activityLogInput.setLog_desc("Deleted '" + client.getClient_name() + "' client.");

                Long currentTimeMillis = System.currentTimeMillis();
                //add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Client deleted successfully.";
            }
        } else {
            return "Client with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String deleteMultipleClient(List<Long> ids, String emp_id) {
        clientList = clientDao.getAllClient();

        for(Long id : ids) {
            String toString = String.valueOf(id);
            ClientOutput client = clientDao.getClientById(toString);
            if(client != null) {
                if(client.getDel_flag() == 1) {
                    return "Client with the ID " + id + " has already been deleted.";
                }
            } else {
                return "Client with the ID " + id + " cannot be found.";
            }
        }
        clientDao.deleteMultipleClient(ids);

        //Acivitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();

        activityLogInput.setEmp_id(emp_id); //current logged user dapat
        activityLogInput.setLog_desc("Deleted multiple clients.");

        Long currentTimeMillis = System.currentTimeMillis();
        //add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);

        return "Records are successfully deleted.";
    }

    @Override
    public String restoreClient(String id) {
        ClientOutput client = clientDao.getClientById(id);
        if(client != null) {
            if(client.getDel_flag() == 0) {
                return "Client with the ID " + id + " is not yet deleted.";
            } else {
                clientDao.restoreClient(id);

                //Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); //current logged user dapat
                activityLogInput.setLog_desc("Restored '" + client.getClient_name() + "' client.");

                Long currentTimeMillis = System.currentTimeMillis();
                //add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Client restored successfully.";
            }
        } else {
            return "Client with the ID " + id + " cannot be found.";
        }
    }
}
