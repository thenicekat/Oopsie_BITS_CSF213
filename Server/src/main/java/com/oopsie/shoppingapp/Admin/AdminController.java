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
    private AdminModel admin;
    private String error;

    public AdminModel getAdmin() {
        return admin;
    }

    public void setAdmin(AdminModel admin) {
        this.admin = admin;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
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
    public AdminSignInModel getExistingAdmin(@RequestBody AdminModel admin) {
        try {
            AdminSignInModel userSignInModel = new AdminSignInModel();
            AdminModel returnedAdmin = adminService.getAdmin(admin.getEmailId());

            // Check if password matches using hash
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            if (bCryptPasswordEncoder.matches(admin.getPassword(), returnedAdmin.getPassword())) {
                // Meaning password is correct
                userSignInModel.setAdmin(returnedAdmin);
            }else{
                // Meaning password is incorrect
                userSignInModel.setError("Incorrect Password");
            }
            return userSignInModel;
        } catch (Exception e) {
            System.out.println("Exception Occured in sign in controller");
            AdminSignInModel userSignInModel = new AdminSignInModel();
            userSignInModel.setAdmin(null);
            userSignInModel.setError("Exception Occured in sign in controller");
            return userSignInModel;
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
