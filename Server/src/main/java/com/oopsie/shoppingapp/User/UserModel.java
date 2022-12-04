package com.oopsie.shoppingapp.User;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId")
    private Long id;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "emailId", unique = true)
    private String emailId;

    @Column(name = "password")
    private String password;

    @Column(name = "money")
    private Long money;

    @Column(name = "reset_password_token")
    private String resetPasswordToken;

    @Column(name = "address")
    private String address;

    public Long getMoney() {
        return money;
    }

    public void setMoney(Long money) {
        this.money = money;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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

    public void setResetPasswordToken(String token) {
        this.resetPasswordToken = token;
    }

    public String getResetPasswordToken() {
        return this.resetPasswordToken;
    }
    
    public void setAddress(String address){
        this.address = address;
    }
   
    public String getAddress() {
        return address;
    }

}
