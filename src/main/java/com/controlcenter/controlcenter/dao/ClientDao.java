package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.ClientInput;
import com.controlcenter.controlcenter.model.ClientOutput;

@Mapper
public interface ClientDao {
    List<ClientOutput> getAllClient();
    ClientOutput getClientById(Long id);
    void addClient(ClientInput client);
    void editClient(Map<String, Object> paramMap);
    void logicalDeleteClient(Long id);
    void restoreClient(Long id);
}
