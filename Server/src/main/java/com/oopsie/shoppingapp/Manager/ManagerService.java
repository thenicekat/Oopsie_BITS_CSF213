package com.oopsie.shoppingapp.Manager;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ManagerService {
    @Autowired
    ManagerRepository managerRepository;

    // CREATE
    public ManagerModel createManager(ManagerModel manager) {
        return managerRepository.save(manager);
    }

    // READ
    public List<ManagerModel> getUsers() {
        return managerRepository.findAll();
    }

    public ManagerModel getManager(String emailId) {
        try {
            ManagerModel manager = managerRepository.findByEmailId(emailId).get();
            return manager;
        } catch (NoSuchElementException e) {
            System.out.println("No Such Element Exception occured");
            return new ManagerModel();
        }
    }

    // UPDATE
    public ManagerModel updateManager(String emailId, ManagerModel managerDetails) {
        try {
            ManagerModel manager = managerRepository.findByEmailId(emailId).get();
            manager.setFirstName(managerDetails.getFirstName());
            manager.setLastName(managerDetails.getLastName());

            return managerRepository.save(manager);
        } catch (NoSuchElementException e) {
            System.out.println("No Such Element Exception occured");
            return null;
        }
    }

    public ManagerModel updateManagerStatus(String emailId){
        try {
            ManagerModel manager = managerRepository.findByEmailId(emailId).get();
            manager.setIsManager(true);

            return managerRepository.save(manager);
        } catch (NoSuchElementException e) {
            System.out.println("No Such Element Exception occured");
            return null;
        }
    }

    // DELETE
    public void deleteManager(Long managerId) {
        managerRepository.deleteById(managerId);
    }
}
