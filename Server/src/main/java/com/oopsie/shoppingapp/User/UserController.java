package com.oopsie.shoppingapp.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

class UserSignInModel {
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
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public UserModel createUser(@RequestBody UserModel user) {
        // Encrypt password before saving
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String hash = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(hash);
        return userService.createUser(user);
    }

    @PostMapping("/signin")
    public UserSignInModel getExistingUser(@RequestBody UserSignInModel user) {
        try {
            UserSignInModel userSignInModel = new UserSignInModel();
            UserModel returnedUser = userService.getUser(user.getEmailId());

            // Check if password matches using hash
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            if (bCryptPasswordEncoder.matches(user.getPassword(), returnedUser.getPassword())) {
                // Meaning password is correct
                userSignInModel.setEmailId(user.getEmailId());
                userSignInModel.setError(null);
                userSignInModel.setPassword(user.getPassword());
            }
            return userSignInModel;
        } catch (Exception e) {
            UserSignInModel userSignInModel = new UserSignInModel();
            userSignInModel.setEmailId(user.getEmailId());
            userSignInModel.setError("Exception Occured in sign in controller");
            userSignInModel.setPassword(user.getPassword());
            return userSignInModel;
        }
    }

    @PostMapping("/update")
    public UserModel updateUser(@RequestBody UserModel user) {
        return userService.updateUser(user.getId(), user);
    }

    @GetMapping("/delete")
    public Boolean deleteUser(@RequestParam long userId) {
        try {
            userService.deleteUser(userId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
