package com.controlcenter.controlcenter.service.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.SectionDao;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.SectionInput;
import com.controlcenter.controlcenter.model.SectionOutput;
import com.controlcenter.controlcenter.service.SectionService;
import com.controlcenter.controlcenter.shared.TimeFormatter;

@Service
public class SectionServiceImpl implements SectionService {

    @Autowired
    public SectionDao sectionDao;

    @Autowired
    public TimeFormatter timeFormatter;

    @Autowired
    public ActivityLogDao activityLogDao;

    public List<SectionOutput> sectionList = new ArrayList<>();

    @Override
    public ResponseEntity<List<SectionOutput>> getAllSection() {
        return ResponseEntity.ok(sectionDao.getAllSection());
    }

    @Override
    public SectionOutput getSectionById(String id) {
        return sectionDao.getSectionById(id);
    }

    @Override
    public String addSection(SectionInput section, String emp_id) {
        try {
            sectionDao.addSection(section);

            // Avtivitylog
            ActivityLogInput activityLogInput = new ActivityLogInput();

            activityLogInput.setEmp_id(emp_id); // current logged user dapat
            activityLogInput.setLog_desc("Added the Section '" + section.getSection_name() + "'.");

            Long currentTimeMillis = System.currentTimeMillis();
            // add the activity log
            activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
            activityLogDao.addActivityLog(activityLogInput);

            return "Section added successfully.";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public String editSectionInfo(String id, SectionInput section, String emp_id) {
        SectionOutput data = sectionDao.getSectionById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Section with the ID " + id + " has already been deleted.";
            } else {
                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("id", id);
                paramMap.put("section", section);

                sectionDao.editSectionInfo(paramMap);

                // Avtivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id(emp_id); // current logged user dapat
                activityLogInput.setLog_desc("Edited a Section");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Section edited successfully.";
            }
        } else {
            return "Section with the ID " + id + " cannot be found.";
        }
    }

    @Override
    public String logicalDeleteSection(String id, String emp_id) {
        SectionOutput data = sectionDao.getSectionById(id);

        if (data != null) {
            if (data.getDel_flag() == 1) {
                return "Section with the ID " + id + " has already been deleted.";
            } else {

            }
        } else {
            return "Section with the ID " + id + " cannot be found.";
        }

        sectionDao.logicalDeleteSection(id);

        // Avtivitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();

        activityLogInput.setEmp_id(emp_id); // current logged user dapat
        activityLogInput.setLog_desc("Deleted a Section");

        Long currentTimeMillis = System.currentTimeMillis();
        // add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);

        return "Section deleted successfully.";
    }

    @Override
    public String deleteMultipleSection(List<Long> ids, String emp_id) {
        sectionList = sectionDao.getAllSection();

        for (Long id : ids) {
            String toString = String.valueOf(id);
            SectionOutput section = sectionDao.getSectionById(toString);
            if (section != null) {
                if (section.getDel_flag() == 1) {
                    return "Section with the ID " + id + " is already deleted.";
                }
            } else {
                return "Section with the ID " + id + " cannot be found.";
            }
        }
        sectionDao.deleteMultipleSection(ids);

        // Acivitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();

        activityLogInput.setEmp_id(emp_id); // current logged user dapat
        activityLogInput.setLog_desc("Deleted multiple Section.");

        Long currentTimeMillis = System.currentTimeMillis();
        // add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);

        return "Records are successfully deleted.";
    }

    @Override
    public String restoreSection(String id) {
        SectionOutput data = sectionDao.getSectionById(id);

        if (data != null) {
            if (data.getDel_flag() == 0) {
                return "Section with the ID " + id + " is not yet deleted.";
            } else {
                sectionDao.restoreSection(id);

                // Avtivitylog
                ActivityLogInput activityLogInput = new ActivityLogInput();

                activityLogInput.setEmp_id("101"); // current logged user dapat
                activityLogInput.setLog_desc("Restored a Section");

                Long currentTimeMillis = System.currentTimeMillis();
                // add the activity log
                activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
                activityLogDao.addActivityLog(activityLogInput);

                return "Section restored successfully.";
            }
        } else {
            return "Section with the ID " + id + " cannot be found.";
        }
    }
}
