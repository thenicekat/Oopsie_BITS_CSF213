package com.oopsie.shoppingapp.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

class AdminSignInModel {
    private String emailId;
    private String password;
    private String error;

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    AdminService adminService;

    @PostMapping("/signup")
    public AdminModel createAdmin(@RequestBody AdminModel admin) {
        // Encrypt password before saving
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String hash = bCryptPasswordEncoder.encode(admin.getPassword());
        admin.setPassword(hash);
        admin.setIsAdmin(true);
        return adminService.createAdmin(admin);
    }

    @PostMapping("/signin")
    public AdminSignInModel getExistingAdmin(@RequestBody AdminSignInModel admin) {
        try {
            AdminSignInModel AdminSignInModel = new AdminSignInModel();
            AdminModel returnedAdmin = adminService.getAdmin(admin.getEmailId());

            // Check if password matches using hash
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            if (bCryptPasswordEncoder.matches(admin.getPassword(), returnedAdmin.getPassword())) {
                // Meaning password is correct
                AdminSignInModel.setEmailId(admin.getEmailId());
                AdminSignInModel.setError(null);
                AdminSignInModel.setPassword(admin.getPassword());
            }else{
                // Meaning password is incorrect
                AdminSignInModel.setError("Incorrect Password");
            }
            return AdminSignInModel;
        } catch (Exception e) {
            System.out.println("Exception Occured in sign in controller");
            AdminSignInModel adminSignInModel = new AdminSignInModel();
            adminSignInModel.setEmailId(admin.getEmailId());
            adminSignInModel.setError("Exception Occured in sign in controller");
            adminSignInModel.setPassword(admin.getPassword());
            return adminSignInModel;
        }
    }

    @PostMapping("/update")
    public AdminModel updateAdmin(@RequestBody AdminModel admin) {
        return adminService.updateAdmin(admin.getEmailId(), admin);
    }

    @DeleteMapping("/delete")
    public Boolean deleteAdmin(@RequestParam long AdminId) {
        try {
            adminService.deleteAdmin(AdminId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
