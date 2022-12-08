package com.oopsie.shoppingapp.User;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.oopsie.shoppingapp.SendEmail;

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
        try {
			SendEmail.sendmail(user.getEmailId(), "Dear " + user.getFirstName() + ", Welcome to OOPSIE", "You are receiving this mail from OOPSIE");
		} catch (Exception e) {
			e.printStackTrace();
		}
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

    public Long getUserMoney(Long userId){
        try {
            UserModel user = userRepository.findById(userId).get();
            return user.getMoney();
        } catch (NoSuchElementException e) {
            System.out.println("No Such Element Exception occured");
            return 0L;
        }
    }

    public Boolean generateOtp(UserModel user){
        int len = 6;
        String numbers = "0123456789";
        // Using random method
        Random rndm_method = new Random();
        char[] otp = new char[len];
        for (int i = 0; i < len; i++)
        {
            // Use of charAt() method : to get character value
            // Use of nextInt() as it is scanning the value as int
            otp[i] = numbers.charAt(rndm_method.nextInt(numbers.length()));
        }
        String otpString = new String(otp);  
        try {
            UserModel returnedUser = userRepository.findByEmailId(user.getEmailId()).get();
            try{
                returnedUser.setOtp(otpString);
                userRepository.save(returnedUser);
                SendEmail.sendmail(returnedUser.getEmailId(), "Your OTP is " +  otpString, "Please change your password using the above OTP");
                return true;
            } catch(Exception e){
                e.printStackTrace();
                System.out.println("Couldn't Send Email");
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Couldn't find user");
            return false;
        }
    }

    public Boolean updateUserPassword(UserModel user, String otp, String newPassword) {
        try {
            UserModel returnedUser = userRepository.findByEmailId(user.getEmailId()).get();
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            if (returnedUser.getOtp().equals(otp)) {
                // Meaning password is correct
                String hash = bCryptPasswordEncoder.encode(newPassword);
                returnedUser.setPassword(hash);
                try {
                    SendEmail.sendmail(user.getEmailId(), "Your Password is changed succesfully", "You are receiving this mail from OOPSIE");
                } catch (Exception e) {
                    e.printStackTrace();
                }
                userRepository.save(returnedUser);
                return true;
            }else{
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Exception Occured in update user password controller");
            return false;
        }
    }

    public Boolean updateUserMoney(Long money, UserModel userDetails) {
        try {
            UserModel user = userRepository.findByEmailId(userDetails.getEmailId()).get();
            user.setMoney(user.getMoney() + money);
            try {
                SendEmail.sendmail(user.getEmailId(), "You have added Rs. " + money + "/-", "Your Current Balance is Rs. " + user.getMoney() + "/-");
            } catch (Exception e) {
                e.printStackTrace();
            }

            userRepository.save(user);
            return true;
        } catch (NoSuchElementException e) {
            System.out.println("No Such Element Exception occured");
            return false;
        } catch (Exception e){
            return false;
        }
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}
