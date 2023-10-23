package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.DevTypeDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.DevTypeInput;
import com.controlcenter.controlcenter.model.DevTypeOutput;
import com.controlcenter.controlcenter.service.DevTypeService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class DevTypeServiceImpl implements DevTypeService {
    @Autowired
    public DevTypeDao devTypeDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    List<DevTypeOutput> devTypeList = new ArrayList<>();

    @Override
    public ResponseEntity<List<DevTypeOutput>> getAllDevType() {
        return ResponseEntity.ok().body(devTypeDao.getAllDevType());
    }

    @Override
    public DevTypeOutput getDevTypeById(String id) {
        return devTypeDao.getDevTypeById(id);
    }

    @Override
    public String addDevType(DevTypeInput devType, String emp_id) {
        try {
            devTypeDao.addDevType(devType);

            // Acivitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id(emp_id); // current logged user dapat
            activityLogInput.setLog_desc("Added '" + devType.getDev_type_name() + "' development type.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Development Type '" + devType.getDev_type_name() + "' added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public ResponseEntity<String> editDevTypeInfo(String id, DevTypeInput devType, String emp_id) {
        DevTypeOutput data = devTypeDao.getDevTypeById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return ResponseEntity.badRequest().body("Development Type with the ID " + id + " has already been deleted.");
            } else {
                if (devType.getDev_type_name().equals(data.getDev_type_name())
                && devType.getDev_type_sh_name().equals(data.getDev_type_sh_name())){
                    return ResponseEntity.ok().body("No changes has been made");
                } else {

                    if (!devType.getDev_type_name().equals(data.getDev_type_name())){
                        Map<String, Object> paramMap = new HashMap<>();
                        paramMap.put("id", id);
                        paramMap.put("devType", devType);

                        devTypeDao.editDevTypeInfo(paramMap);

                        if (!data.getDev_type_name().equals(devType.getDev_type_name())) {
                            // Acivitylog
                            ActivityLogInput activityLogInput = new ActivityLogInput();

                            activityLogInput.setEmp_id(emp_id); // current logged user dapat
                            activityLogInput.setLog_desc("Edited '" + data.getDev_type_name() + "' to '" + devType.getDev_type_name() + "' development type.");

                            Long currentTimeMillis = System.currentTimeMillis();
                            // add the activity log
                            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                            activityLogDao.addActivityLog(activityLogInput);
                        }
                        return ResponseEntity.ok().body("Edited '" + devType.getDev_type_name() + "' successfully ");
                    } else  {
                        Map<String, Object> paramMap = new HashMap<>();
                        paramMap.put("id", id);
                        paramMap.put("devType", devType);

                        devTypeDao.editDevTypeInfo(paramMap);

                        // Acivitylog
                        ActivityLogInput activityLogInput = new ActivityLogInput();

                        activityLogInput.setEmp_id(emp_id); // current logged user dapat
                        activityLogInput.setLog_desc("Edited the short name of '" + devType.getDev_type_name() + "' development type.");

                        Long currentTimeMillis = System.currentTimeMillis();
                        // add the activity log
                        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                        activityLogDao.addActivityLog(activityLogInput);

                        return ResponseEntity.ok().body("Edited '" + devType.getDev_type_name() + "' successfully ");
                    }
                 
                }  
            }
        } else {
            return ResponseEntity.badRequest().body("Development Type with the ID " + id + " cannot be found.");
        }
    }

    @Override
    public String logicalDeleteDevType(String id, String emp_id) {
        DevTypeOutput devType = devTypeDao.getDevTypeById(id);

        if (devType != null) {
            if (devType.getDel_flag() == 1) {
                return "Development Type with the ID " + id + " has already been deleted.";
            } else {
                devTypeDao.logicalDeleteDevType(id);

                // Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Deleted '" + devType.getDev_type_name() + "' development type.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Development Type '" + devType.getDev_type_name() + "' deleted successfully.";
            }
        } else {
            return "Development Type with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String deleteMultipleDevType(List<Long> ids, String emp_id) {
        devTypeList = devTypeDao.getAllDevType();

        for(Long id : ids) {
            String toString = String.valueOf(id);
            DevTypeOutput devType = devTypeDao.getDevTypeById(toString);
            if(devType != null) {
                if(devType.getDel_flag() == 1) {
                    return "Development Type with the ID " + id + " has already been deleted.";
                }
            } else {
                return "Development Type with the ID " + id + " cannot be found.";
            }
        }
        devTypeDao.deleteMultipleDevType(ids);

        //Acivitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();
        Long currentTimeMillis = System.currentTimeMillis();

        List<String> devTypes = new ArrayList<>();
        StringBuilder formattedList = new StringBuilder();

        for(Long id : ids) {
            String toString = String.valueOf(id);
            DevTypeOutput devType = devTypeDao.getDevTypeById(toString);
            devTypes.add(devType.getDev_type_name());
        }

        for(String element : devTypes) {
            formattedList.append("'").append(element).append("', ");
        }

        if (formattedList.length() > 0) {
            formattedList.delete(formattedList.length() - 2, formattedList.length());
        }   

        activityLogInput.setEmp_id(emp_id); //current logged user dapat
        activityLogInput.setLog_desc("Deleted multiple Development Types: " + formattedList.toString() + ".");

        //add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);

        return "Records are successfully deleted.";
    }

    @Override
    public String restoreDevType(String id) {
        DevTypeOutput devType = devTypeDao.getDevTypeById(id);

        if (devType != null) {
            if (devType.getDel_flag() == 0) {
                return "Development Type with the ID " + id + " is not yet deleted.";
            } else {
                devTypeDao.restoreDevType(id);

                // Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Restored '" + devType.getDev_type_name() + "' development type.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Development Type '" + devType.getDev_type_name() + "' restored successfully.";
            }
        } else {
            return "Development Type with the ID " + id + " cannot be found.";
        }
    }
}
