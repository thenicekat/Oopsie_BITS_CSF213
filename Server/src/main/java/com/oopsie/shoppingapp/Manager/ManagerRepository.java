package com.oopsie.shoppingapp.Manager;

import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ManagerRepository extends JpaRepository<ManagerModel, Long> {
    Optional<ManagerModel> findByEmailId(String emailId);
}
