package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.DepartmentDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.DepartmentInput;
import com.controlcenter.controlcenter.model.DepartmentOutput;
import com.controlcenter.controlcenter.service.DepartmentService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    public DepartmentDao departmentDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    List<DepartmentOutput> departmentList = new ArrayList<>();

    @Override
    public DepartmentOutput getDepartmentById(String id) {
        return departmentDao.getDepartmentById(id);
    }

    @Override
    public ResponseEntity<List<DepartmentOutput>> getAllDepartment() {
        try {
            List<DepartmentOutput> departments = departmentDao.getAllDepartment();
            return ResponseEntity.ok(departments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public String addDepartment(DepartmentInput department, String emp_id) {
        try {
            departmentDao.addDepartment(department);

            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id(emp_id); // current logged user dapat
            activityLogInput.setLog_desc("Added the Business Unit '" + department.getDept_name() + "'.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Business Unit '" + department.getDept_name() + "' added successfully.";

        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public ResponseEntity<String> editDepartmentInfo(String id, DepartmentInput department, String emp_id) {
        DepartmentOutput data = departmentDao.getDepartmentById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return ResponseEntity.badRequest().body("Business Unit with the ID " + id + " has already been deleted.");
            } else {
                if (department.getDept_name().equals(data.getDept_name())
                && department.getDept_sh_name().equals(data.getDept_sh_name())
                && department.getDept_desc().equals(data.getDept_desc())){
                    return ResponseEntity.ok().body("No changes has been made");
                } else {

                    if(!department.getDept_name().equals(data.getDept_name())){
                        Map<String, Object> paramMap = new HashMap<>();

                        paramMap.put("id", id);
                        paramMap.put("department", department);

                        departmentDao.editDepartmentInfo(paramMap);

                        if (!data.getDept_name().equals(department.getDept_name())){
                            // Acivitylog
                            ActivityLogInput activityLogInput = new ActivityLogInput();

                            activityLogInput.setEmp_id(emp_id); // current logged user dapat
                            activityLogInput.setLog_desc("Edited '" + data.getDept_name() + "' to '" + department.getDept_name() + "' business unit.");

                            Long currentTimeMillis = System.currentTimeMillis();
                            // add the activity log
                            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                            activityLogDao.addActivityLog(activityLogInput);
                        }

                        return ResponseEntity.ok().body("Edited '" + department.getDept_name() + "' successfully.");
                    } else if(!department.getDept_sh_name().equals(data.getDept_sh_name())){
                        Map<String, Object> paramMap = new HashMap<>();

                        paramMap.put("id", id);
                        paramMap.put("department", department);

                        departmentDao.editDepartmentInfo(paramMap);

                        // Acivitylog
                        ActivityLogInput activityLogInput = new ActivityLogInput();

                        activityLogInput.setEmp_id(emp_id); // current logged user dapat
                        activityLogInput.setLog_desc("Edited the short name of '" + department.getDept_name() + "' business unit.");

                        Long currentTimeMillis = System.currentTimeMillis();
                        // add the activity log
                        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                        activityLogDao.addActivityLog(activityLogInput);

                        return ResponseEntity.ok().body("Edited '" + department.getDept_name() + "' successfully.");
                    } else {
                        Map<String, Object> paramMap = new HashMap<>();

                        paramMap.put("id", id);
                        paramMap.put("department", department);

                        departmentDao.editDepartmentInfo(paramMap);

                        // Acivitylog
                        ActivityLogInput activityLogInput = new ActivityLogInput();

                        activityLogInput.setEmp_id(emp_id); // current logged user dapat
                        activityLogInput.setLog_desc("Edited the description of '" + department.getDept_name() + "' business unit.");

                        Long currentTimeMillis = System.currentTimeMillis();
                        // add the activity log
                        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                        activityLogDao.addActivityLog(activityLogInput);

                        return ResponseEntity.ok().body("Edited '" + department.getDept_name() + "' successfully.");
                    } 
                }
               
            }
        } else {
            return ResponseEntity.badRequest().body("Business Unit with the ID " + id + " cannot be found.");
        }

    }

    @Override
    public String logicalDeleteDepartment(String id, String emp_id) {
        DepartmentOutput data = departmentDao.getDepartmentById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Business Unit with the ID " + id + " has already been deleted.";
            } else {
                departmentDao.logicalDeleteDepartment(id);

                // Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Deleted the Business Unit '" + data.getDept_name() + "'.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Business Unit deleted successfully.";
            }

        } else {
            return "Business Unit with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String deleteMultipleDepartment(List<Long> ids, String emp_id) {
        departmentList = departmentDao.getAllDepartment();

        for (Long id : ids) {
            String toString = String.valueOf(id);
            DepartmentOutput department = departmentDao.getDepartmentById(toString);
            if (department != null) {
                if (department.getDel_flag() == 1) {
                    return "Business Unit with the ID " + id + " is already deleted.";
                }
            } else {
                return "Business Unit with the ID " + id + " cannot be found.";
            }
        }
        departmentDao.deleteMultipleDepartment(ids);

        // Acivitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();
        Long currentTimeMillis = System.currentTimeMillis();
        List<String> businessUnits = new ArrayList<>();
        StringBuilder formattedList = new StringBuilder();

        for (Long id : ids) {
            String toString = String.valueOf(id);
            DepartmentOutput department = departmentDao.getDepartmentById(toString);
            businessUnits.add(department.getDept_name());
        }

        for (String element : businessUnits) {
            formattedList.append("'").append(element).append("', ");
        }

        if (formattedList.length() > 0) {
            formattedList.delete(formattedList.length() - 2, formattedList.length());
        }

        activityLogInput.setEmp_id(emp_id); // current logged user dapat
        activityLogInput.setLog_desc("Deleted multiple Business Units: " + formattedList.toString() + ".");
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        // add the activity log
        activityLogDao.addActivityLog(activityLogInput);
        return "Records are successfully deleted.";
    }

    @Override
    public String restoreDepartment(String id) {
        DepartmentOutput data = departmentDao.getDepartmentById(id);

        if (data != null) {
            if (data.getDel_flag() == 0) {
                return "Business Unit with the ID " + id + " is not yet deleted.";
            } else {
                departmentDao.restoreDepartment(id);

                // Acivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Restored a Business Unit.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Business Unit '" + data.getDept_name() + "' restored successfully.";
            }

        } else {
            return "Business Unit with the ID " + id + " cannot be found.";
        }
    }

}
