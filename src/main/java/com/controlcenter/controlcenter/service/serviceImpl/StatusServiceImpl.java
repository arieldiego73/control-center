package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.StatusDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.StatusInput;
import com.controlcenter.controlcenter.model.StatusOutput;
import com.controlcenter.controlcenter.service.StatusService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class StatusServiceImpl implements StatusService {

    @Autowired 
    public StatusDao statusDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    public List<StatusOutput> statusList = new ArrayList<>();

    @Override
    public ResponseEntity<List<StatusOutput>> getAllStatus() {
        return ResponseEntity.ok(statusDao.getAllStatus());
    }

    @Override
    public StatusOutput getStatusById(String id) {
        return statusDao.getStatusById(id);
    }

    @Override
    public String addStatus(StatusInput status, String emp_id) {
        try {
            statusDao.addStatus(status);

            // Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id(emp_id); // current logged user dapat
            activityLogInput.setLog_desc("Added '" + status.getStatus_name() + "' status.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Status '" + status.getStatus_name() + "' added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public ResponseEntity<String> editStatusInfo(String code, StatusOutput status, String emp_id) {

        StatusOutput statusById = statusDao.getStatusById(code);

        if (statusById != null) {
            if (statusById.getDel_flag() == 1) {
                return ResponseEntity.badRequest().body("Status with the code " + code + " has already been deleted.") ;
            } else {
                if(status.getStatus_name().equals(statusById.getStatus_name())
                && status.getStatus_desc().equals(statusById.getStatus_desc()))
                {
                    return ResponseEntity.ok().body("No changes has been done");
                } else {
                    if (!status.getStatus_name().equals(statusById.getStatus_name())){
                        Map<String, Object> paramMap = new HashMap<>();
                        statusById.setStatus_code(statusById.getStatus_code());
                        status.setStatus_code(statusById.getStatus_code());
                        System.out.println(status);
                        paramMap.put("code", code);
                        paramMap.put("status", status);

                        statusDao.editStatusInfo(paramMap);
                        Long currentTimeMillis = System.currentTimeMillis();

                        if (!statusById.getStatus_name().equals(status.getStatus_name())) {
                            // Activitylog
                            ActivityLogInput activityLogInput = new ActivityLogInput();

                            activityLogInput.setEmp_id(emp_id); // current logged user dapat
                            activityLogInput.setLog_desc("Edited '" + statusById.getStatus_name() + "' to '" + status.getStatus_name() + "' status.");

                            // add the activity log
                            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                            activityLogDao.addActivityLog(activityLogInput);
                        }

                        return ResponseEntity.ok().body("Edited '" + status.getStatus_name() + "' successfully.") ;
                    } else {
                        Map<String, Object> paramMap = new HashMap<>();
                        statusById.setStatus_code(statusById.getStatus_code());
                        status.setStatus_code(statusById.getStatus_code());
                        System.out.println(status);
                        paramMap.put("code", code);
                        paramMap.put("status", status);

                        statusDao.editStatusInfo(paramMap);

                        // Activitylog
                        ActivityLogInput activityLogInput = new ActivityLogInput();

                        activityLogInput.setEmp_id(emp_id); // current logged user dapat
                        activityLogInput.setLog_desc("Edited the description of '" + status.getStatus_name() + "' status.");

                        Long currentTimeMillis = System.currentTimeMillis();
                        // add the activity log
                        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                        activityLogDao.addActivityLog(activityLogInput);

                        return ResponseEntity.ok().body("Edited '" + status.getStatus_name() + "' successfully.") ;
                    }
                }
            }
        } else {
            return ResponseEntity.badRequest().body("Status with the code " + code + " cannot be found.") ;
        }
    }

    @Override
    public String logicalDeleteStatus(String code, String emp_id) {
        StatusOutput status = statusDao.getStatusById(code);

        if (status != null) {
            if (status.getDel_flag() == 1) {
                return "Status with the code " + code + " has already been deleted.";
            } else {
                statusDao.logicalDeleteStatus(code);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Deleted '" + status.getStatus_name() + "' status.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Status '" + status.getStatus_name() + "' deleted successfully.";
            }
        } else {
            return "Status with the code " + code + " cannot be found.";
        }
    }

    @Override
    public String deleteMultipleStatus(List<String> ids, String emp_id) {
        statusList = statusDao.getAllStatus();

        for (String id : ids) {
            String toString = String.valueOf(id);
            StatusOutput status = statusDao.getStatusById(toString);
            if (status != null) {
                if (status.getDel_flag() == 1) {
                    return "Status with the ID " + id + " is already deleted.";
                }
            } else {
                return "Status with the ID " + id + " cannot be found.";
            }
        }
        statusDao.deleteMultipleStatus(ids);

        // Acivitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();
        Long currentTimeMillis = System.currentTimeMillis();

        List<String> statuses = new ArrayList<>();
        StringBuilder formattedList = new StringBuilder();

        for(String id : ids) {
            String toString = String.valueOf(id);
            StatusOutput status = statusDao.getStatusById(toString);
            statuses.add(status.getStatus_name());
        }

        for(String element : statuses) {
            formattedList.append("'").append(element).append("', ");
        }

        if (formattedList.length() > 0) {
            formattedList.delete(formattedList.length() - 2, formattedList.length());
        } 

        activityLogInput.setEmp_id(emp_id); // current logged user dapat
        activityLogInput.setLog_desc("Deleted multiple status: " + formattedList.toString() + ".");

        // add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);

        return "Records are successfully deleted.";
    }

    @Override
    public String restoreStatus(String code) {
        StatusOutput status = statusDao.getStatusById(code);

        if (status != null) {
            if (status.getDel_flag() == 0) {
                return "Status with the code " + code + " is not yet deleted.";
            } else {
                statusDao.restoreStatus(code);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Restored '" + status.getStatus_name() + "' status.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Status '" + status.getStatus_name() + "' restored successfully.";
            }
        } else {
            return "Status with the code " + code + " cannot be found.";
        }
    }
}
