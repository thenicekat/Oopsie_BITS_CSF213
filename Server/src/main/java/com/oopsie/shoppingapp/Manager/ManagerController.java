package com.oopsie.shoppingapp.Manager;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

class ManagerReturnModel {
    private ManagerModel manager;
    private String error;

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public ManagerModel getManager() {
        return manager;
    }

    public void setManager(ManagerModel manager) {
        this.manager = manager;
    }
}

@CrossOrigin
@RestController
@RequestMapping("/manager")
public class ManagerController {
    @Autowired
    ManagerService managerService;

    @PostMapping("/signup")
    public ManagerModel createManager(@RequestBody ManagerModel manager) {
        // Encrypt password before saving
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String hash = bCryptPasswordEncoder.encode(manager.getPassword());
        manager.setPassword(hash);
        manager.setIsManager(true);
        return managerService.createManager(manager);
    }

    @PostMapping("/signin")
    public ManagerReturnModel getExistingManager(@RequestBody ManagerModel manager) {
        try {
            ManagerReturnModel ManagerReturnModel = new ManagerReturnModel();

            ManagerModel returnedManager = managerService.getManager(manager.getEmailId());

            // Check if password matches using hash
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            
            if (bCryptPasswordEncoder.matches(manager.getPassword(), returnedManager.getPassword())) {
                // Meaning password is correct
                returnedManager.setPassword("Not Readable");

                ManagerReturnModel.setManager(returnedManager);

                ManagerReturnModel.setError(null);
            }else{
                // Meaning password is incorrect
                ManagerReturnModel.setError("Incorrect Password");
            }
            return ManagerReturnModel;
        } catch (Exception e) {
            System.out.println("Exception Occured in sign in controller");
            ManagerReturnModel managerSignInModel = new ManagerReturnModel();
            managerSignInModel.getManager().setEmailId(manager.getEmailId());
            managerSignInModel.setError("Exception Occured in sign in controller");
            managerSignInModel.getManager().setPassword(manager.getPassword());
            return managerSignInModel;
        }
    }

    @GetMapping("/list")
    public List<ManagerModel> getAllManagers() {
        return managerService.getUsers();
    }

    @PostMapping("/update")
    public ManagerModel updateManager(@RequestBody ManagerModel manager) {
        return managerService.updateManager(manager.getEmailId(), manager);
    }

    @PostMapping("/changeStatus")
    public ManagerModel updateManagerStatus(@RequestBody ManagerModel manager) {
        return managerService.updateManagerStatus(manager.getEmailId());
    }

    @DeleteMapping("/delete")
    public Boolean deleteManager(@RequestParam long ManagerId) {
        try {
            managerService.deleteManager(ManagerId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
