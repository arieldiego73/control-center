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
    public String addPosition(PositionInput position) {
        try {
            positionDao.addPosition(position);

            // Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); // current logged user dapat
            activityLogInput.setLog_desc("Added a postion.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Position Added Successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editPositionInfo(String id, PositionInput position) {
        PositionOutput data = positionDao.getPositionById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Position with the ID " + id + " has already been deleted.";
            } else {
                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("id", id);
                paramMap.put("position", position);

                positionDao.editPositionInfo(paramMap);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Edited a postion.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Position Info Edited Successfully.";
            }
        } else {
            return "Position with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String logicalDeletePosition(String id) {
        PositionOutput data = positionDao.getPositionById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Position with the ID " + id + " has already been deleted.";
            } else {

            }
        } else {
            return "Position with the ID " + id + " cannot be found.";
        }
        positionDao.logicalDeletePosition(id);

        // Activitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();

        activityLogInput.setEmp_id("101"); // current logged user dapat
        activityLogInput.setLog_desc("Deleted a postion.");

        Long currentTimeMillis = System.currentTimeMillis();
        // add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);

        return "Position Deleted Successfully.";
    }

    @Override
    public String deleteMultiplePosition(@RequestParam List<Long> ids) {
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

        activityLogInput.setEmp_id("101"); // current logged user dapat
        activityLogInput.setLog_desc("Deleted a multiple postion.");

        Long currentTimeMillis = System.currentTimeMillis();
        // add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);
        
        return "Records are successfully deleted.";
    }

    @Override
    public String restorePosition(String id) {
        PositionOutput data = positionDao.getPositionById(id);

        if (data != null) {
            if (data.getDel_flag() == 0) {
                return "Position with the ID " + id + " is not yet deleted.";
            } else {
                positionDao.restorePosition(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Restored a postion.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Position Restored Successfully.";
            }
        } else {
            return "Position with the ID " + id + " cannot be found.";
        }

    }
}
