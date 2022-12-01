package com.oopsie.shoppingapp.User;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

class UserSignInModel {
    private UserModel user;
    private String error;

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
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
    public UserSignInModel getExistingUser(@RequestBody UserModel user) {
        try {
            UserSignInModel userSignInModel = new UserSignInModel();
            try {
                UserModel returnedUser = userService.getUser(user.getEmailId());
                // Check if password matches using hash
                BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
                if (bCryptPasswordEncoder.matches(user.getPassword(), returnedUser.getPassword())) {
                    // Meaning password is correct
                    userSignInModel.setUser(returnedUser);
                } else {
                    // Meaning password is incorrect
                    userSignInModel.setError("Incorrect Password");
                }
            } catch (NoSuchElementException e) {
                userSignInModel.setError("Account does not exist");
            }
            return userSignInModel;
        } catch (Exception e) {
            System.out.println("Exception Occured in sign in controller");
            UserSignInModel userSignInModel = new UserSignInModel();
            userSignInModel.setUser(null);
            userSignInModel.setError("Exception Occured in sign in controller");
            return userSignInModel;
        }
    }

    @PostMapping("/update")
    public UserModel updateUser(@RequestBody UserModel user) {
        return userService.updateUser(user.getEmailId(), user);
    }

    @PostMapping("/transact")
    public Boolean transact(@RequestBody UserModel user) {
        return userService.updateUserMoney(user.getMoney(), user);
    }

    @PostMapping("/updatePassword")
    public Boolean updateUserPassword(@RequestBody UserModel user, @RequestParam String newPassword) {
        return userService.updateUserPassword(user, newPassword);
    }

    @DeleteMapping("/delete")
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
