//Ricky Galpo
package com.controlcenter.controlcenter.service.serviceImpl;

import com.controlcenter.controlcenter.dao.ActivityLogDao;
import com.controlcenter.controlcenter.dao.MultiRoleDao;
import com.controlcenter.controlcenter.dao.PersonalInfoDao;
import com.controlcenter.controlcenter.dao.RoleDao;
import com.controlcenter.controlcenter.dao.UserDao;
import com.controlcenter.controlcenter.model.AccountInput;
import com.controlcenter.controlcenter.model.AccountOutput;
import com.controlcenter.controlcenter.model.ActivityLogInput;
import com.controlcenter.controlcenter.model.PersonalInfoInput;
import com.controlcenter.controlcenter.model.PersonalInfoOutput;
import com.controlcenter.controlcenter.model.RoleOutput;
import com.controlcenter.controlcenter.model.UserInfoOutput;
import com.controlcenter.controlcenter.model.UserInput;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.model.UserRoles;
import com.controlcenter.controlcenter.model.UserTable;
import com.controlcenter.controlcenter.service.UserService;
import com.controlcenter.controlcenter.shared.FormatChecker;
import com.controlcenter.controlcenter.shared.TimeFormatter;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
// import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  public UserDao userDao;

  @Autowired
  public TimeFormatter timeFormatter;

  @Autowired
  public ActivityLogDao activityLogDao;

  @Autowired
  public PersonalInfoDao personalInfoDao;

  @Autowired
  public MultiRoleDao multiRoleDao;

  @Autowired
  public RoleDao roleDao;

  @Autowired
  public FormatChecker formatChecker;

  @Autowired
  public PasswordEncoder passEnc;

  List<UserOutput> userList = new ArrayList<>();

  // @Value("${image.upload.directory}")
  // private String targetDirectoryPath;

  @Override
  public ResponseEntity<List<UserTable>> userTable() {
    try {
      List<UserTable> users = userDao.userTable();
      return ResponseEntity.ok(users);
    } catch (Exception e) {
      return ResponseEntity.status(404).build();
    }
  }

  public ResponseEntity<List<UserOutput>> getAllUser() {
    try {
      List<UserOutput> users = userDao.getAllUser();
      return ResponseEntity.ok(users);
    } catch (Exception e) {
      return ResponseEntity.status(404).build();
    }
  }

  public ResponseEntity<List<UserInfoOutput>> getAllPossibleManager() {
    return ResponseEntity.ok(userDao.getAllPossibleManager());
  }

  @Override
  public ResponseEntity<UserInfoOutput> getUserById(String id) {
    try {
      UserInfoOutput user = userDao.getUserById(id);
      return ResponseEntity.ok(user);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  // getting multiple user by emp_id using request param
  @Override
  public ResponseEntity<List<UserInfoOutput>> getMultipleUserById(List<String> emp_ids) {
    List<UserInfoOutput> listOfInfo = new ArrayList<>();
    // for(String emp_id : emp_ids) {
    // List<UserInfoOutput> multipleUsers = userDao.getMultipleUserById(emp_id);
    // List<Map<String, Object>> allUsers = multipleUsers.stream()
    // .map(user -> {
    // Map<String, Object> currentUsers = new HashMap<>();
    // currentUsers.put(user.getEmp_id(), userDao.getUserById(user.getEmp_id()));
    // return currentUsers;
    // }).collect(Collectors.toList());
    // }
    // for(String emp_id : emp_ids) {
    // allUsers.put(emp_id, userDao.getUserById(emp_id));
    // }
    for (String emp_id : emp_ids) {
      listOfInfo.add(userDao.getUserById(emp_id));
    }
    // listOfUsers.add(allUsers);
    return ResponseEntity.ok(listOfInfo);
  }

  @Override
  public String editUser(String id, UserInput user) {
    HashMap<String, Object> paramMap = new HashMap<>();

    paramMap.put("id", id);
    paramMap.put("user", user);

    userDao.editUser(paramMap);

    return "User edited successfully.";
  }

  // @Override
  // public String insertUser(UserInput user) {
  // UserInput userHashed = user;
  // userHashed.setPassword(passEnc.encode(user.getPassword()));

  // try {
  // userDao.insertUser(userHashed);
  // return "User created successfully";
  // } catch (Exception e) {
  // return e.getMessage();
  // }
  // }

  @Override
  public ResponseEntity<String> addAccount(AccountInput account, List<Long> role_ids, String emp_id) {

    UserInfoOutput userById = userDao.getUserById(account.getEmp_id());

    if (userById != null) {
      return ResponseEntity.badRequest().body("The Emplyee ID of " + account.getEmp_id() + " is already taken.");
    } else {
      List<UserTable> users = userDao.userTable();

      for (UserTable perUser : users) {
        if (account.getUsername().equals(perUser.getUsername())) {
          return ResponseEntity.badRequest().body("The Username of " + account.getUsername() + " is already taken.");
        } else if (account.getEmail().equals(perUser.getEmail())) {
          return ResponseEntity.badRequest().body("The Email of " + account.getEmail() + " is already taken.");
        }
      }

      if (formatChecker.containsLetters(account.getEmp_id())) {
        return ResponseEntity.badRequest().body("Associate ID should only be a number");
      }

      if (!formatChecker.isValidEmail(account.getEmail())) {
        return ResponseEntity.badRequest().body("Invalid Email");
      }

      if (!account.getPassword().equals(account.getConfirm_password())) {
        return ResponseEntity.badRequest().body("Password and confirm password do not match");
      }

      UserInput user = new UserInput();
      PersonalInfoInput personalInfo = new PersonalInfoInput();
      // initializing the value of user.
      user.setEmp_id(account.getEmp_id());
      user.setUsername(account.getUsername());
      user.setPassword(passEnc.encode(account.getPassword()));
      user.setPosition_id(account.getPosition_id());
      user.setDept_id(account.getDept_id());
      user.setSection_id(account.getSection_id());
      user.setStatus_code(account.getStatus_code());
      // user.setRole_id(account.getRole_id());
      user.setImg_src(account.getImg_src());

      // initializing the value of personal info.
      personalInfo.setEmp_id(account.getEmp_id());
      personalInfo.setFname(account.getFname());
      personalInfo.setLname(account.getLname());
      personalInfo.setMname(account.getMname());
      personalInfo.setEmail(account.getEmail());

      try {
        userDao.insertUser(user);
        personalInfoDao.addPersonalInfo(personalInfo);

        // ActivityLogInput activityLogInput = new ActivityLogInput();

        // activityLogInput.setEmp_id("101"); //current logged user dapat
        // activityLogInput.setLog_desc("Added a User.");

        // Long currentTimeMillis = System.currentTimeMillis();
        // //add the activity log
        // activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        // activityLogDao.addActivityLog(activityLogInput);
      } catch (Exception e) {
        return ResponseEntity.status(404).body(e.getMessage());
      }

      for (Long id : role_ids) {
        multiRoleDao.addMultiRole(account.getEmp_id(), id);
      }

      // Activitylog
      ActivityLogInput activityLogInput = new ActivityLogInput();

      activityLogInput.setEmp_id(emp_id); // current logged user dapat
      activityLogInput.setLog_desc("Added '" + user.getUsername() + "' account.");

      Long currentTimeMillis = System.currentTimeMillis();
      // add the activity log
      activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
      activityLogDao.addActivityLog(activityLogInput);
      return ResponseEntity.ok("Account '" + user.getUsername() + "' Created Successfully");
    }
  }

  @Override
  public ResponseEntity<String> editAccount(String id, AccountOutput accountBody, List<Long> role_ids, String emp_id,
      @RequestParam(value = "photo", required = false) MultipartFile photo) {
    HashMap<String, Object> userMap = new HashMap<>();
    HashMap<String, Object> personalInfoMap = new HashMap<>();

    UserOutput user = new UserOutput();
    PersonalInfoOutput personalInfo = new PersonalInfoOutput();

    UserInfoOutput userBodyChecker = userDao.getUserById(id);

    List<Long> userRoleIds = userDao.getAllRolesOfUser(accountBody.getEmp_id())
        .stream()
        .map(perRole -> {
          return perRole.getRole_id();
        }).collect(Collectors.toList());

    boolean areEqueal = userRoleIds.equals(role_ids);

    try {
      // UserOutput existingUser = profileDao.getUserById(emp_id);
      if (userBodyChecker == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
      }

      long maxFileSize = 5 * 1024 * 1024;

      if (photo != null && !photo.isEmpty()) {
        if (photo.getSize() > maxFileSize) {
          return ResponseEntity.badRequest().body("File size exceeds the maximum limit.");
        }

        String timeStamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        String user_id = userBodyChecker.getEmp_id().toString();
        String originalFileName = photo.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
        // String newFilename = timeStamp + "." + extension;
        String newFilename = "user " + user_id + "." + extension;

        // String targetDirectory = "C:\\Storage\\Profile";
        // String targetDirectory = "C:\\Users\\sfabre\\Desktop\\Control Center
        // Project\\control-center\\frontend\\src\\Assets\\userImage";
        // String targetDirectory = "../../../Assets/userImage/";
        // String targetDirectory = targetDirectoryPath;
        String userHomeDirectory = System.getProperty("user.home");
        String targetDirectory = userHomeDirectory + File.separator + "Desktop" + File.separator
            + "Control Center Project" + File.separator + "control-center" + File.separator + "frontend"
            + File.separator + "src" + File.separator + "Assets" + File.separator + "userImage";

        File directory = new File(targetDirectory);

        if (!directory.exists()) {
          directory.mkdirs();
        }

        Path targetPath = Paths.get(targetDirectory, newFilename);

        // If a file with the same name already exists, delete it
        if (userBodyChecker.getImg_src() != null && !userBodyChecker.getImg_src().isEmpty()) {
          Path existingFilePath = Paths.get(targetDirectory, userBodyChecker.getImg_src());
          if (Files.exists(existingFilePath)) {
            Files.delete(existingFilePath);
          }
        }

        // sameImage = formatChecker.isSameImage(newFilename,
        // userBodyChecker.getImg_src());
        userBodyChecker.setImg_src(newFilename);
        user.setImg_src(newFilename);

        Files.copy(photo.getInputStream(), targetPath);
        userDao.updateUserPicture(userBodyChecker);
        return ResponseEntity.status(200).body("Picture upload successful");
      }

    } catch (Exception e) {
    }

    // for(Long role_id : role_ids) {
    // roleChecker.add(role_id);
    // }
    boolean isPasswordEqual = accountBody.getPassword().equals(userBodyChecker.getPassword());

    if (accountBody.getUsername().equals(userBodyChecker.getUsername())
        && accountBody.getStatus_code().equals(userBodyChecker.getStatus_code())
        && accountBody.getFname().equals(userBodyChecker.getFname())
        && accountBody.getMname().equals(userBodyChecker.getMname())
        && accountBody.getLname().equals(userBodyChecker.getLname())
        && accountBody.getEmail().equals(userBodyChecker.getEmail())
        && isPasswordEqual
        && accountBody.getPosition_id() == userBodyChecker.getPosition_id()
        && accountBody.getDept_id() == userBodyChecker.getDept_id()
        && accountBody.getSection_id() == userBodyChecker.getSection_id()
        && areEqueal) {
      return ResponseEntity.ok().body("No changes were made.");
    } else {

      // if old and current doesn't match, it will return bad request.
      // boolean isOldAndCurrentPasswordMatch =
      // passEnc.matches(accountBody.getCurrent_password(),
      // userBodyChecker.getPassword());
      // if (!isOldAndCurrentPasswordMatch) {
      // return ResponseEntity.status(401).body("Old password and current password
      // doesn't match");
      // } else {
      // //if new and confirm password are empty it returns bad request.
      // if(accountBody.getNew_password() == "" &&
      // accountBody.getConfirm_new_password() == "") {
      // return ResponseEntity.badRequest().body("New password field is empty and
      // confirm password field are empty.");
      // } else if(accountBody.getNew_password() == "") {
      // return ResponseEntity.badRequest().body("New password field is empty.");
      // } else if(accountBody.getCurrent_password() == "") {
      // return ResponseEntity.badRequest().body("Confirm new password field is
      // empty.");
      // }
      // // if new and confirm new doesn't match, it will return bad request.
      // boolean isNewAndConfirmNewMatch =
      // accountBody.getNew_password().equals(accountBody.getConfirm_new_password());
      // if (!isNewAndConfirmNewMatch) {
      // return ResponseEntity.status(401).body("New password and confirm new password
      // doesn't match");
      // } else {

      user.setEmp_id(accountBody.getEmp_id());
      user.setUsername(accountBody.getUsername());
      user.setPassword(passEnc.encode(accountBody.getPassword()));
      user.setPosition_id(accountBody.getPosition_id());
      user.setDept_id(accountBody.getDept_id());
      user.setSection_id(accountBody.getSection_id());
      user.setStatus_code(accountBody.getStatus_code());
      // user.setRole_id(accountBody.getRole_id());
      // user.setImg_src(accountBody.getImg_src());

      personalInfo.setEmp_id(accountBody.getEmp_id());
      personalInfo.setFname(accountBody.getFname());
      personalInfo.setLname(accountBody.getLname());
      personalInfo.setMname(accountBody.getMname());
      personalInfo.setEmail(accountBody.getEmail());

      userMap.put("id", id);
      userMap.put("user", user);

      personalInfoMap.put("id", id);
      personalInfoMap.put("personalInfo", personalInfo);

      userDao.editUser(userMap);
      personalInfoDao.editPersonalInfo(personalInfoMap);

      // Activitylog
      ActivityLogInput activityLogInput = new ActivityLogInput();

      activityLogInput.setEmp_id(emp_id); // current logged user dapat
      activityLogInput.setLog_desc("Edited '" + user.getUsername() + "' account.");

      Long currentTimeMillis = System.currentTimeMillis();
      // add the activity log
      activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
      activityLogDao.addActivityLog(activityLogInput);

      if (role_ids.size() > userRoleIds.size()) {
        List<String> roleNames = new ArrayList<>();
        StringBuilder formattedList = new StringBuilder();
        RoleOutput role = new RoleOutput();

        for (Long role_id : role_ids) {
          if (!userRoleIds.contains(role_id)) {
            multiRoleDao.addMultiRole(user.getEmp_id(), role_id);
            role = roleDao.getRoleById(String.valueOf(role_id));
            roleNames.add(role.getTitle());
          }
        }

        for (String element : roleNames) {
          formattedList.append("'").append(element).append("', ");
        }

        if (formattedList.length() > 0) {
          formattedList.delete(formattedList.length() - 2, formattedList.length());
        }

        if (roleNames.size() > 1) {
          ActivityLogInput activityLogInputForRoles = new ActivityLogInput();

          activityLogInputForRoles.setEmp_id(emp_id); // current logged user dapat
          activityLogInputForRoles.setLog_desc(
              "Added multiple roles: " + formattedList.toString() + " on the account of '" + user.getUsername()
                  + "'.");
          // add the activity log
          activityLogInputForRoles.setLog_date(timeFormatter.formatTime(currentTimeMillis));
          activityLogDao.addActivityLog(activityLogInputForRoles);
        } else {
          ActivityLogInput activityLogInputForRoles = new ActivityLogInput();

          activityLogInputForRoles.setEmp_id(emp_id); // current logged user dapat
          activityLogInputForRoles.setLog_desc(
              "Added " + formattedList.toString() + " role on the account of '" + user.getUsername() + "'.");
          // add the activity log
          activityLogInputForRoles.setLog_date(timeFormatter.formatTime(currentTimeMillis));
          activityLogDao.addActivityLog(activityLogInputForRoles);
        }

      } else if (role_ids.size() < userRoleIds.size()) {
        List<String> roleNames = new ArrayList<>();
        StringBuilder formattedList = new StringBuilder();
        RoleOutput role = new RoleOutput();

        for (Long role_id : userRoleIds) {
          if (!role_ids.contains(role_id)) {
            multiRoleDao.permaDeleteRoleOfUser(user.getEmp_id(), role_id);
            role = roleDao.getRoleById(String.valueOf(role_id));
            roleNames.add(role.getTitle());
          }
        }

        for (String element : roleNames) {
          formattedList.append("'").append(element).append("', ");
        }

        if (formattedList.length() > 0) {
          formattedList.delete(formattedList.length() - 2, formattedList.length());
        }

        if (roleNames.size() > 1) {
          ActivityLogInput activityLogInputForRoles = new ActivityLogInput();

          activityLogInputForRoles.setEmp_id(emp_id); // current logged user dapat
          activityLogInputForRoles.setLog_desc("Removed multiple roles: " + formattedList.toString()
              + " on the account of '" + user.getUsername() + "'.");
          // add the activity log
          activityLogInputForRoles.setLog_date(timeFormatter.formatTime(currentTimeMillis));
          activityLogDao.addActivityLog(activityLogInputForRoles);
        } else {
          ActivityLogInput activityLogInputForRoles = new ActivityLogInput();

          activityLogInputForRoles.setEmp_id(emp_id); // current logged user dapat
          activityLogInputForRoles.setLog_desc(
              "Removed " + formattedList.toString() + " role on the account of '" + user.getUsername() + "'.");
          // add the activity log
          activityLogInputForRoles.setLog_date(timeFormatter.formatTime(currentTimeMillis));
          activityLogDao.addActivityLog(activityLogInputForRoles);
        }
      } else {
        List<String> removedNames = new ArrayList<>();
        List<String> addedNames = new ArrayList<>();
        StringBuilder addedListNames = new StringBuilder();
        StringBuilder removedListNames = new StringBuilder();
        RoleOutput role = new RoleOutput();

        for (Long role_id : userRoleIds) {
          if (!role_ids.contains(role_id)) {
            multiRoleDao.permaDeleteRoleOfUser(user.getEmp_id(), role_id);
            role = roleDao.getRoleById(String.valueOf(role_id));
            removedNames.add(role.getTitle());
          }
        }

        for (String element : removedNames) {
          removedListNames.append("'").append(element).append("', ");
        }

        if (removedListNames.length() > 0) {
          removedListNames.delete(removedListNames.length() - 2, removedListNames.length());
        }

        if (removedNames.size() > 1) {
          ActivityLogInput activityLogInputForRoles = new ActivityLogInput();

          activityLogInputForRoles.setEmp_id(emp_id); // current logged user dapat
          activityLogInputForRoles.setLog_desc("Removed multiple roles: " + removedListNames.toString()
              + " on the account of '" + user.getUsername() + "'.");
          // add the activity log
          activityLogInputForRoles.setLog_date(timeFormatter.formatTime(currentTimeMillis));
          activityLogDao.addActivityLog(activityLogInputForRoles);
        } else {
          ActivityLogInput activityLogInputForRoles = new ActivityLogInput();

          activityLogInputForRoles.setEmp_id(emp_id); // current logged user dapat
          activityLogInputForRoles.setLog_desc(
              "Removed " + removedListNames.toString() + " role on the account of '" + user.getUsername() + "'.");
          // add the activity log
          activityLogInputForRoles.setLog_date(timeFormatter.formatTime(currentTimeMillis));
          activityLogDao.addActivityLog(activityLogInputForRoles);
        }

        for (Long role_id : role_ids) {
          if (!userRoleIds.contains(role_id)) {
            multiRoleDao.addMultiRole(user.getEmp_id(), role_id);
            role = roleDao.getRoleById(String.valueOf(role_id));
            addedNames.add(role.getTitle());
          }
        }

        for (String element : addedNames) {
          addedListNames.append("'").append(element).append("', ");
        }

        if (addedListNames.length() > 0) {
          addedListNames.delete(addedListNames.length() - 2, addedListNames.length());
        }

        if (addedNames.size() > 1) {
          ActivityLogInput activityLogInputForRoles = new ActivityLogInput();

          activityLogInputForRoles.setEmp_id(emp_id); // current logged user dapat
          activityLogInputForRoles.setLog_desc("Added multiple roles: " + addedListNames.toString()
              + " on the account of '" + user.getUsername() + "'.");
          // add the activity log
          activityLogInputForRoles.setLog_date(timeFormatter.formatTime(currentTimeMillis));
          activityLogDao.addActivityLog(activityLogInputForRoles);
        } else {
          ActivityLogInput activityLogInputForRoles = new ActivityLogInput();

          activityLogInputForRoles.setEmp_id(emp_id); // current logged user dapat
          activityLogInputForRoles.setLog_desc(
              "Added " + addedListNames.toString() + " role on the account of '" + user.getUsername() + "'.");
          // add the activity log
          activityLogInputForRoles.setLog_date(timeFormatter.formatTime(currentTimeMillis));
          activityLogDao.addActivityLog(activityLogInputForRoles);
        }
      }
      // for(UserRoles userRole : rolesOfUser) {
      // multiRoleDao.permaDeleteRoleOfUser(accountBody.getEmp_id(),
      // userRole.getRole_id());
      // }

      // List<String> roleNames = new ArrayList<>();
      // StringBuilder formattedList = new StringBuilder();
      // for(Long role_id : role_ids) {
      // multiRoleDao.addMultiRole(user.getEmp_id(), role_id);
      // RoleOutput role = roleDao.getRoleById(String.valueOf(role_id));
      // roleNames.add(role.getTitle());
      // }

      // for(String element : roleNames) {
      // formattedList.append("'").append(element).append("', ");
      // }

      // if(formattedList.length() > 0) {
      // formattedList.delete(formattedList.length() - 2, formattedList.length());
      // }

      // if(roleNames.size() > 1) {
      // ActivityLogInput activityLogInputForRoles = new ActivityLogInput();

      // activityLogInputForRoles.setEmp_id(emp_id); // current logged user dapat
      // activityLogInputForRoles.setLog_desc("Added multiple roles " +
      // formattedList.toString() + " on the account of '" + user.getUsername() +
      // "'.");
      // // add the activity log
      // activityLogInputForRoles.setLog_date(timeFormatter.formatTime(currentTimeMillis));
      // activityLogDao.addActivityLog(activityLogInputForRoles);
      // } else {
      // ActivityLogInput activityLogInputForRoles = new ActivityLogInput();

      // activityLogInputForRoles.setEmp_id(emp_id); // current logged user dapat
      // activityLogInputForRoles.setLog_desc("Added the role " +
      // formattedList.toString() + " on the account of '" + user.getUsername() +
      // "'.");
      // // add the activity log
      // activityLogInputForRoles.setLog_date(timeFormatter.formatTime(currentTimeMillis));
      // activityLogDao.addActivityLog(activityLogInputForRoles);
      // }
      // }
      // }
    }
    return ResponseEntity.ok("Account '" + user.getUsername() + "' edited successfully.");
  }

  // setting the del_flag of user to 1
  @Override
  public ResponseEntity<String> logicalDeleteUser(String id, String emp_id) {
    UserInfoOutput user = userDao.getUserById(id);
    userDao.logicalDeleteUser(id);
    personalInfoDao.logicalDeletePersonalInfo(id);
    multiRoleDao.logicalDeleteMultiRole(id);

    // Activitylog
    ActivityLogInput activityLogInput = new ActivityLogInput();

    activityLogInput.setEmp_id(emp_id); // current logged user dapat
    activityLogInput.setLog_desc("Deleted '" + user.getUsername() + "' account.");

    Long currentTimeMillis = System.currentTimeMillis();
    // add the activity log
    activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
    activityLogDao.addActivityLog(activityLogInput);

    return ResponseEntity.ok("User '" + user.getUsername() + "' has been deleted.");
  }

  @Override
  public String deleteMultipleUser(List<String> ids, String emp_id) {
    userList = userDao.getAllUser();

    for (String id : ids) {
      UserInfoOutput user = userDao.getUserById(id);
      if (user != null) {
        if (user.getDel_flag() == 1) {
          return "User with the ID " + id + " has already been deleted.";
        }
      } else {
        return "User with the ID " + id + " cannot be found.";
      }
    }

    // Acivitylog
    ActivityLogInput activityLogInput = new ActivityLogInput();
    Long currentTimeMillis = System.currentTimeMillis();

    List<String> users = new ArrayList<>();
    StringBuilder formattedList = new StringBuilder();

    for (String id : ids) {
      UserInfoOutput user = userDao.getUserById(id);
      users.add(user.getUsername());
    }

    for (String element : users) {
      formattedList.append("'").append(element).append("', ");
    }

    if (formattedList.length() > 0) {
      formattedList.delete(formattedList.length() - 2, formattedList.length());
    }

    if (users.size() > 1) {
      activityLogInput.setEmp_id(emp_id); // current logged user dapat
      activityLogInput.setLog_desc("Deleted multiple accounts: " + formattedList.toString() + ".");

      // add the activity log
      activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
      activityLogDao.addActivityLog(activityLogInput);
    } else {
      activityLogInput.setEmp_id(emp_id); // current logged user dapat
      activityLogInput.setLog_desc("Deleted " + formattedList.toString() + " account.");

      // add the activity log
      activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
      activityLogDao.addActivityLog(activityLogInput);
    }

    userDao.deleteMultipleUser(ids);
    personalInfoDao.deleteMultiplePersonalInfo(ids);
    multiRoleDao.deleteMultipleMultiRole(ids);

    return "Records are successfully deleted.";
  }

  // setting the del_flag of user to 0
  @Override
  public ResponseEntity<String> restoreUser(String id) {
    UserInfoOutput user = userDao.getUserById(id);
    userDao.restoreUser(id);
    personalInfoDao.restorePersonalInfo(id);
    multiRoleDao.restoreMultiRole(id);
    return ResponseEntity.ok("User '" + user.getUsername() + "' has been restored.");
  }
  // @Override
  // public String insertUserBatch(List<User> users) {
  // try {
  // userDao.insertUserBatch(users);
  // return "ok";
  // } catch (Exception e) {
  // return e.getMessage();
  // }
  // }

  // @Override
  // public UserOutput getUserByUsername(UserOutput username) {
  // return userDao.getUserByUsername(username);
  // }

  @Override
  public UserOutput getUsername(String username) {
    return userDao.getUsername(username);
  }

  // @Override
  // public UserDetails loadUserByUsername(String username) throws
  // UsernameNotFoundException {
  // UserOutput user = userDao.getUsername(username);

  // if(user == null) {
  // throw new UsernameNotFoundException(username + "not found.");
  // }
  // return new User(
  // user.getUsername(),
  // user.getPassword(),
  // Collections.emptyList()
  // );
  // }

  @Override
  public String getLoggedInUser(UserOutput user) {

    UserOutput users = userDao.getUserByUsername(user);

    if (users != null) {
      boolean isMatched = passEnc.matches(
          user.getPassword(),
          users.getPassword());

      if (isMatched) {
        users.setEmp_id(users.getEmp_id());
        users.setUsername(users.getUsername());
        users.setPassword(users.getPassword());
        users.setPosition_id(users.getPosition_id());
        users.setDept_id(users.getDept_id());
        users.setSection_id(users.getSection_id());
        users.setStatus_code(users.getStatus_code());
        // users.setRole_id(users.getRole_id());
        users.setImg_src(users.getImg_src());

        // Activitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();

        activityLogInput.setEmp_id("101"); // current logged user dapat
        activityLogInput.setLog_desc("Has signed in.");

        Long currentTimeMillis = System.currentTimeMillis();
        // add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);

        return "Log in success.";
      } else {

        // Activitylog
        ActivityLogInput activityLogInput = new ActivityLogInput();

        activityLogInput.setEmp_id("101"); // current logged user dapat
        activityLogInput.setLog_desc("Log in unsuccessful.");

        Long currentTimeMillis = System.currentTimeMillis();
        // add the activity log
        activityLogInput.setLog_date(timeFormatter.formatTime(currentTimeMillis));
        activityLogDao.addActivityLog(activityLogInput);

        return "Log in unsuccessful.";
      }
    } else {
      return "Username and Password doesn't match.";
    }

  }

  // get all roles of a user
  @Override
  public ResponseEntity<List<Map<Long, Object>>> getAllRolesOfUser(String emp_id) {
    List<UserRoles> rolesOfUser = userDao.getAllRolesOfUser(emp_id);
    List<Map<Long, Object>> allRoles = rolesOfUser.stream()
        .map(role -> {
          Map<Long, Object> currentRoles = new HashMap<>();
          currentRoles.put(role.getRole_id(), role.getRole_sh_name());
          return currentRoles;
        }).collect(Collectors.toList());

    return ResponseEntity.ok(allRoles);
  }

  @Override
  public ResponseEntity<String> changePassword(String user_id, String admin_password, String new_password,
      String confirm_new_password) {
    UserInfoOutput user = userDao.getUserById(user_id);

    // dummy data for admin password. It should be the password of the currently
    // logged in user.
    boolean isMatched = admin_password.equals("admin123");

    if (user == null) {
      return ResponseEntity.notFound().build();
    } else {
      if (admin_password == "" && new_password == "" && confirm_new_password == "") {
        return ResponseEntity.badRequest().body("Password fields are empty");
      } else {

        if (admin_password == "") {
          return ResponseEntity.badRequest().body("Admin password field is empty");
        }

        if (new_password == "") {
          return ResponseEntity.badRequest().body("New password field is empty");
        }

        if (confirm_new_password == "") {
          return ResponseEntity.badRequest().body("Confirm new password field is empty");
        }

        if (!isMatched) {
          return ResponseEntity.badRequest().body("Admin password incorrect");
        } else {
          if (new_password == "" || confirm_new_password == "") {
            return ResponseEntity.badRequest().body("New password or confirm password are empty");
          } else {
            if (new_password.length() < 6) {
              return ResponseEntity.badRequest().body("New password is too short");
            } else {
              if (!new_password.equals(confirm_new_password)) {
                return ResponseEntity.badRequest().body("New password and confirm password do not match");
              } else {
                userDao.changePassword(user_id, passEnc.encode(new_password));
                return ResponseEntity.ok("Password Changed Successfully.");
              }
            }
          }
        }
      }
    }
  }
}
