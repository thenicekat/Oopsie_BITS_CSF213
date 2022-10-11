package com.oopsie.shoppingapp.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public UserModel createUser(@RequestBody UserModel user){
        return userService.createUser(user);
    }

    @PostMapping("/update")
    public UserModel updateUser(@RequestBody UserModel user){
        return userService.updateUser(user.getId(), user);
    }

    @GetMapping("/delete")
    public Boolean deleteUser(@RequestParam long userId){
        try{
            userService.deleteUser(userId);
            return true;
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @PostMapping("/signin")
    public UserModel getExistingUser(@RequestBody UserModel user){
        return userService.getUser(user.getEmailId());
    }
}
