package com.oopsie.shoppingapp.Admin;

import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface AdminRepository extends JpaRepository<AdminModel, Long> {
    Optional<AdminModel> findByEmailId(String emailId);
}
