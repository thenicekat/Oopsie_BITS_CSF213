package com.oopsie.shoppingapp.User;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
        user.setMoney(1000L);
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
    public UserModel updateUser(String emailId, UserModel userDetails) {
        try {
            UserModel user = userRepository.findByEmailId(emailId).get();
            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            return userRepository.save(user);
        } catch (NoSuchElementException e) {
            System.out.println("No Such Element Exception occured");
            return null;
        }
    }

    public Boolean updateUserPassword(UserModel user, String newPassword) {
        try {
            UserModel returnedUser = userRepository.findByEmailId(user.getEmailId()).get();
            // Check if password matches using hash
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            if (bCryptPasswordEncoder.matches(user.getPassword(), returnedUser.getPassword())) {
                // Meaning password is correct
                String hash = bCryptPasswordEncoder.encode(newPassword);
                returnedUser.setPassword(hash);
                userRepository.save(returnedUser);
                return true;
            }else{
                // Meaning password is incorrect
                return false;
            }
        } catch (Exception e) {
            System.out.println("Exception Occured in sign in controller");
            return false;
        }
    }

    // DELETE
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}
