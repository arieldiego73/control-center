package com.controlcenter.controlcenter.service.serviceImpl;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.controlcenter.controlcenter.dao.ProfileDao;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.service.ProfileService;

@Service
public class ProfileServiceImpl implements ProfileService{

    @Autowired
    ProfileDao profileDao;

    @Override
    public UserOutput getUserById(String emp_id) {
        return profileDao.getUserById(emp_id);
    }

    @Override
    public ResponseEntity<String> updateUserPicture(@PathVariable("emp_id") String emp_id, @RequestParam("photo") MultipartFile photo) {

        try {
            UserOutput existingUser = profileDao.getUserById(emp_id);
            if (existingUser == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            long maxFileSize = 5 * 1024 * 1024;

            if (photo != null && !photo.isEmpty()) {
                if (photo.getSize() > maxFileSize) {
                    return ResponseEntity.badRequest().body("File size exceeds the maximum limit.");
                }

                String timeStamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
                String originalFileName = photo.getOriginalFilename();
                String extension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
                String newFilename = timeStamp + "." + extension;

                String targetDirectory = "C:\\Storage\\Profile";

                File directory = new File(targetDirectory);

                if (!directory.exists()) {
                    directory.mkdirs();
                }

                Path targetPath = Paths.get(targetDirectory, newFilename);

                Files.copy(photo.getInputStream(), targetPath);

                existingUser.setImg_src(newFilename);

                profileDao.updateUserPicture(existingUser);
                return ResponseEntity.ok("User picture uploaded successfully");
            }

            return ResponseEntity.badRequest().body("Please select a picture to upload.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload user picture");
        }
    }

    @Override
    public ResponseEntity<FileSystemResource> getUserPicture(String emp_id) {
        try {
            UserOutput user = profileDao.getUserById(emp_id);
            if (user == null || user.getImg_src() == null) {
                return ResponseEntity.notFound().build();
            }

            String targetDirectory = "C:\\Storage\\Profile";
            String filename = user.getImg_src();

            File pictureFile = new File(targetDirectory, filename);

            if (!pictureFile.exists()) {
                return ResponseEntity.notFound().build();
            }

            // Set the Content-Disposition header to "inline" to display the image in the
            // browser.
            return ResponseEntity
                    .ok()
                    .header("Content-Disposition", "inline; filename=\"" + filename + "\"")
                    .contentType(MediaType.parseMediaType("image/jpeg"))
                    .body(new FileSystemResource(pictureFile));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
