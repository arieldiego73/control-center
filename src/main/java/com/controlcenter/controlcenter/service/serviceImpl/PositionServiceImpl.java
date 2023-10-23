package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.PositionDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.PositionInput;
import com.controlcenter.controlcenter.model.PositionOutput;
import com.controlcenter.controlcenter.service.PositionService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class PositionServiceImpl implements PositionService {

    @Autowired 
    public PositionDao positionDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    List<PositionOutput> positionList = new ArrayList<>();

    @Override
    public ResponseEntity<List<PositionOutput>> getAllPosition() {
        return ResponseEntity.ok(positionDao.getAllPosition());
    }

    @Override
    public PositionOutput getPositionById(String id) {
        return positionDao.getPositionById(id);
    }

    @Override
    public String addPosition(PositionInput position, String emp_id) {
        try {
            positionDao.addPosition(position);

            // Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id(emp_id); // current logged user dapat
            activityLogInput.setLog_desc("Added '" + position.getPosition_name() + "' postion.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Position '" + position.getPosition_name() + "' added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public ResponseEntity<String> editPositionInfo(String id, PositionInput position, String emp_id) {
        PositionOutput data = positionDao.getPositionById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return ResponseEntity.badRequest().body("Position with the ID " + id + " has already been deleted.");
            } else {
                if( position.getPosition_name().equals(data.getPosition_name())
                && position.getPosition_sh_name().equals(data.getPosition_sh_name())
                && position.getPosition_desc().equals(data.getPosition_desc())){
                    return ResponseEntity.ok().body("No changes has been made");
                } else {

                    if(!position.getPosition_name().equals(data.getPosition_name())){
                        Map<String, Object> paramMap = new HashMap<>();
                        paramMap.put("id", id);
                        paramMap.put("position", position);

                        positionDao.editPositionInfo(paramMap);

                        if (!data.getPosition_name().equals(position.getPosition_name())){
                            // Activitylog
                            ActivityLogInput activityLogInput = new ActivityLogInput();

                            activityLogInput.setEmp_id(emp_id); // current logged user dapat
                            activityLogInput.setLog_desc("Edited '" + data.getPosition_name() + "' to '" + position.getPosition_name() + "' position.");

                            Long currentTimeMillis = System.currentTimeMillis();
                            // add the activity log
                            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                            activityLogDao.addActivityLog(activityLogInput);
                        }

                        return ResponseEntity.ok().body("Edited '" + position.getPosition_name() + "' successfully.");
                    } else if (!position.getPosition_sh_name().equals(data.getPosition_sh_name())){
                        Map<String, Object> paramMap = new HashMap<>();
                        paramMap.put("id", id);
                        paramMap.put("position", position);

                        positionDao.editPositionInfo(paramMap);

                        // Activitylog
                        ActivityLogInput activityLogInput = new ActivityLogInput();

                        activityLogInput.setEmp_id(emp_id); // current logged user dapat
                        activityLogInput.setLog_desc("Edited the short name of '" + position.getPosition_name() + "' postion.");

                        Long currentTimeMillis = System.currentTimeMillis();
                        // add the activity log
                        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                        activityLogDao.addActivityLog(activityLogInput);

                        return ResponseEntity.ok().body("Edited '" + position.getPosition_name() + "' successfully.");
                    } else {
                        Map<String, Object> paramMap = new HashMap<>();
                        paramMap.put("id", id);
                        paramMap.put("position", position);

                        positionDao.editPositionInfo(paramMap);

                        // Activitylog
                        ActivityLogInput activityLogInput = new ActivityLogInput();

                        activityLogInput.setEmp_id(emp_id); // current logged user dapat
                        activityLogInput.setLog_desc("Edited the description of '" + position.getPosition_name() + "' postion.");

                        Long currentTimeMillis = System.currentTimeMillis();
                        // add the activity log
                        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                        activityLogDao.addActivityLog(activityLogInput);

                        return ResponseEntity.ok().body("Edited '" + position.getPosition_name() + "' successfully.");
                    }
                }
              
            }
        } else {
            return ResponseEntity.badRequest().body("Position with the ID " + id + " cannot be found.");
       
        }
    }

    @Override
    public String logicalDeletePosition(String id, String emp_id) {
        PositionOutput position = positionDao.getPositionById(id);

        if (position != null) {
            if (position.getDel_flag() == 1) {
                return "Position with the ID " + id + " has already been deleted.";
            } else {
                positionDao.logicalDeletePosition(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Deleted '" + position.getPosition_name() + "' postion.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Position '" + position.getPosition_name() + "' deleted successfully.";
            }
        } else {
            return "Position with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String deleteMultiplePosition(@RequestParam List<Long> ids, String emp_id) {
        positionList = positionDao.getAllPosition();

        for (Long id : ids) {
            String toString = String.valueOf(id);
            PositionOutput data = positionDao.getPositionById(toString);
            if (data != null) {
                if (data.getDel_flag() == 1) {
                    return "Position with the ID " + id + " has already been deleted.";
                }
            } else {
                return "Position with the ID " + id + " cannot be found.";
            }
        }
        positionDao.deleteMultiplePosition(ids);

        // Activitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();
        Long currentTimeMillis = System.currentTimeMillis();

        List<String>  positions= new ArrayList<>();
        StringBuilder formattedList = new StringBuilder();

        for(Long id : ids) {
            String toString = String.valueOf(id);
            PositionOutput  position= positionDao.getPositionById(toString);
            positions.add(position.getPosition_name());
        }

        for(String element : positions) {
            formattedList.append("'").append(element).append("', ");
        }

        if (formattedList.length() > 0) {
            formattedList.delete(formattedList.length() - 2, formattedList.length());
        } 

        activityLogInput.setEmp_id(emp_id); // current logged user dapat
        activityLogInput.setLog_desc("Deleted multiple Postions: " + formattedList.toString() + ".");

        // add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);
        return "Records are successfully deleted.";
    }

    @Override
    public String restorePosition(String id) {
        PositionOutput position = positionDao.getPositionById(id);

        if (position != null) {
            if (position.getDel_flag() == 0) {
                return "Position with the ID " + id + " is not yet deleted.";
            } else {
                positionDao.restorePosition(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Restored '" + position.getPosition_name() + "' postion.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Position '" + position.getPosition_name() + "' restored successfully.";
            }
        } else {
            return "Position with the ID " + id + " cannot be found.";
        }

    }
}
