package com.oopsie.shoppingapp.User;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    // CREATE
    /**
     * @param user
     * @return
     */
    public UserModel createUser(UserModel user) {
        return userRepository.save(user);
    }

    // READ
    public List<UserModel> getUsers() {
        return userRepository.findAll();
    }

    public UserModel getUser(String emailId) {
        try {
            UserModel user = userRepository.findByEmailId(emailId).get();
            return user;
        } catch (NoSuchElementException e) {
            System.out.println("No Such Element Exception occured");
            return new UserModel();
        }
    }

    // UPDATE
    public UserModel updateUser(Long userId, UserModel userDetails) {
        try {
            UserModel user = userRepository.findById(userId).get();
            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            user.setEmailId(userDetails.getEmailId());

            return userRepository.save(user);
        } catch (NoSuchElementException e) {
            System.out.println("No Such Element Exception occured");
            return null;
        }
    }

    // DELETE
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}
