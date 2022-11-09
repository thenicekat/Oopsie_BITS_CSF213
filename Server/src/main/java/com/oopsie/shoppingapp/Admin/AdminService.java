package com.oopsie.shoppingapp.Admin;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    AdminRepository adminRepository;

    // CREATE
    public AdminModel createAdmin(AdminModel admin) {
        return adminRepository.save(admin);
    }

    // READ
    public List<AdminModel> getUsers() {
        return adminRepository.findAll();
    }

    public AdminModel getAdmin(String emailId) {
        try {
            AdminModel admin = adminRepository.findByEmailId(emailId).get();
            return admin;
        } catch (NoSuchElementException e) {
            System.out.println("No Such Element Exception occured");
            return new AdminModel();
        }
    }

    // UPDATE
    public AdminModel updateAdmin(String emailId, AdminModel adminDetails) {
        try {
            AdminModel admin = adminRepository.findByEmailId(emailId).get();
            admin.setFirstName(adminDetails.getFirstName());
            admin.setLastName(adminDetails.getLastName());

            return adminRepository.save(admin);
        } catch (NoSuchElementException e) {
            System.out.println("No Such Element Exception occured");
            return null;
        }
    }

    // DELETE
    public void deleteAdmin(Long adminId) {
        adminRepository.deleteById(adminId);
    }
}
