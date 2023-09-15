package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.TechnologyDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.TechnologyInput;
import com.controlcenter.controlcenter.model.TechnologyOutput;
import com.controlcenter.controlcenter.service.TechnologyService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class TechnologyServiceImpl implements TechnologyService {

    @Autowired
    public TechnologyDao technologyDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    List<TechnologyOutput> technologyList = new ArrayList<>();

    @Override
    public List<TechnologyOutput> getAllTechnology() {
        return technologyDao.getAllTechnology();
    }

    @Override
    public TechnologyOutput getTechnologyById(String id) {
        return technologyDao.getTechnologyById(id);
    }

    @Override
    public String addTechnology(TechnologyInput technology) {
        try {
            technologyDao.addTechnology(technology);

            // Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id("101"); // current logged user dapat
            activityLogInput.setLog_desc("Added a Technology.");

            Long currentTimeMillis = System.currentTimeMillis();
            // Add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Technology added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editTechnology(String id, TechnologyInput technology) {
        TechnologyOutput data = technologyDao.getTechnologyById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Technology with the ID " + id + " has already been deleted.";
            } else {
                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("id", id);
                paramMap.put("technology", technology);
                technologyDao.editTechnology(paramMap);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Edited a Technology.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Technology edited successfully.";
            }
        } else {
            return "Technology with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String logicalDeleteTechnology(String id) {
        TechnologyOutput data = technologyDao.getTechnologyById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Technology with the ID " + id + " has already been deleted.";
            } else {
                technologyDao.logicalDeleteTechnology(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Deleted a Technology.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Technology deleted successfully.";
            }
        } else {
            return "Technology with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String deleteMultipleTechnology(List<Long> ids) {
        technologyList = technologyDao.getAllTechnology();

        for (Long id : ids) {
            String toString = String.valueOf(id);
            TechnologyOutput technology = technologyDao.getTechnologyById(toString);
            if (technology != null) {
                if (technology.getDel_flag() == 1) {
                    return "Technology with the ID " + id + " is already deleted.";
                }
            } else {
                return "Technology with the ID " + id + " cannot be found.";
            }
        }
        technologyDao.deleteMultipleTechnology(ids);

        // Acivitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();

        activityLogInput.setEmp_id("101"); // current logged user dapat
        activityLogInput.setLog_desc("Deleted multiple Technologies.");

        Long currentTimeMillis = System.currentTimeMillis();
        // add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);

        return "Records are successfully deleted.";
    }

    @Override
    public String restoreTechnology(String id) {
        TechnologyOutput data = technologyDao.getTechnologyById(id);

        if (data != null) {
            if (data.getDel_flag() == 0) {
                return "Technology with the ID " + id + " is not yet deleted.";
            } else {
                technologyDao.restoreTechnology(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Restored a Technology.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Technology restored successfully.";
            }
        } else {
            return "Technology with the ID " + id + " cannot be found.";
        }
    }

}
