package com.controlcenter.controlcenter.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.controlcenter.controlcenter.model.Client;

@Mapper
public interface ClientDao {
    List<Client> getAllClient();
    void addClient(Client client);
    void editClient(Map<String, Object> paramMap);
    void logicalDeleteClient(String id);
}
