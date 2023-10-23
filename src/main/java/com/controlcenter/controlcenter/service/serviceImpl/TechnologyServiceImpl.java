package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<TechnologyOutput>> getAllTechnology() {
        return ResponseEntity.ok(technologyDao.getAllTechnology());
    }

    @Override
    public TechnologyOutput getTechnologyById(String id) {
        return technologyDao.getTechnologyById(id);
    }

    @Override
    public String addTechnology(TechnologyInput technology, String emp_id) {
        try {
            technologyDao.addTechnology(technology);

            // Activitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id(emp_id); // current logged user dapat
            activityLogInput.setLog_desc("Added '" + technology.getTech_name() + "' technology.");

            Long currentTimeMillis = System.currentTimeMillis();
            // Add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Technology '" + technology.getTech_name() + "' added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public ResponseEntity<String> editTechnology(String id, TechnologyInput technology, String emp_id) {
        TechnologyOutput data = technologyDao.getTechnologyById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return ResponseEntity.badRequest().body("Technology with the ID " + id + " has already been deleted.");
            } else {

                if (technology.getTech_name().equals(data.getTech_name())
                && technology.getTech_sh_name().equals(data.getTech_sh_name())){
                    return ResponseEntity.ok().body("No changes has been made");
                } else {

                    if(!technology.getTech_name().equals(data.getTech_name())){
                        Map<String, Object> paramMap = new HashMap<>();
                        paramMap.put("id", id);
                        paramMap.put("technology", technology);
                        technologyDao.editTechnology(paramMap);

                        if (!data.getTech_name().equals(technology.getTech_name())) {
                            // Activitylog
                            ActivityLogInput activityLogInput = new ActivityLogInput();

                            activityLogInput.setEmp_id(emp_id); // current logged user dapat
                            activityLogInput.setLog_desc("Edited '" + data.getTech_name() + "' to '" + technology.getTech_name() + "' technology.");

                            Long currentTimeMillis = System.currentTimeMillis();
                            // add the activity log
                            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                            activityLogDao.addActivityLog(activityLogInput);
                        }

                        return ResponseEntity.ok().body("Edited '" + technology.getTech_name() + "'  successfully.");
                    } else {
                        Map<String, Object> paramMap = new HashMap<>();
                        paramMap.put("id", id);
                        paramMap.put("technology", technology);
                        technologyDao.editTechnology(paramMap);

                        // Activitylog
                        ActivityLogInput activityLogInput = new ActivityLogInput();

                        activityLogInput.setEmp_id(emp_id); // current logged user dapat
                        activityLogInput.setLog_desc("Edited the short name of '" + technology.getTech_name() + "' technology.");

                        Long currentTimeMillis = System.currentTimeMillis();
                        // add the activity log
                        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                        activityLogDao.addActivityLog(activityLogInput);

                        return ResponseEntity.ok().body("Edited '" + technology.getTech_name() + "'  successfully.");
                    }
                }
            }
        } else {
            return ResponseEntity.badRequest().body("Technology with the ID " + id + " cannot be found.");
        }
    }

    @Override
    public String logicalDeleteTechnology(String id, String emp_id) {
        TechnologyOutput technology = technologyDao.getTechnologyById(id);

        if (technology != null) {
            if (technology.getDel_flag() == 1) {
                return "Technology with the ID " + id + " has already been deleted.";
            } else {
                technologyDao.logicalDeleteTechnology(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Deleted '" + technology.getTech_name() + "' technology.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Technology '" + technology.getTech_name() + "' deleted successfully.";
            }
        } else {
            return "Technology with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String deleteMultipleTechnology(List<Long> ids, String emp_id) {
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
        Long currentTimeMillis = System.currentTimeMillis();

        List<String> technologies = new ArrayList<>();
        StringBuilder formattedList = new StringBuilder();

        for(Long id : ids) {
            String toString = String.valueOf(id);
            TechnologyOutput technology = technologyDao.getTechnologyById(toString);
            technologies.add(technology.getTech_name());
        }

        for(String element : technologies) {
            formattedList.append("'").append(element).append("', ");
        }

        if (formattedList.length() > 0) {
            formattedList.delete(formattedList.length() - 2, formattedList.length());
        } 

        activityLogInput.setEmp_id(emp_id); // current logged user dapat
        activityLogInput.setLog_desc("Deleted multiple Technologies: " + formattedList.toString() + ".");

        // add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);

        return "Records are successfully deleted.";
    }

    @Override
    public String restoreTechnology(String id) {
        TechnologyOutput technology = technologyDao.getTechnologyById(id);

        if (technology != null) {
            if (technology.getDel_flag() == 0) {
                return "Technology with the ID " + id + " is not yet deleted.";
            } else {
                technologyDao.restoreTechnology(id);

                // Activitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Restored '" + technology.getTech_name() + "' technology.");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Technology '" + technology.getTech_name() + "' restored successfully.";
            }
        } else {
            return "Technology with the ID " + id + " cannot be found.";
        }
    }

}
