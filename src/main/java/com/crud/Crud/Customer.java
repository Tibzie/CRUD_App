package com.crud.Crud;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity

public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int accountNumber;
    private String firstname;
    private String surname;
    private String username;
    private int phonenum;

    private Customer() {}

    public Customer(int accountNumber, String firstName, String surname, String user_name, int phonenum) {
        super();
        this.accountNumber = accountNumber;
        this.firstname = firstName;
        this.surname = surname;
        this.username = user_name;
        this.phonenum = phonenum;
    }

    public void setAccountNumber(int accountNumber) {
        this.accountNumber = accountNumber;
    }
    public int getAccountNumber() {
        return accountNumber;
    }
    public void setFirstName(String firstName) {
        this.firstname = firstName;
    }
    public String getFirstName() {
        return firstname;
    }
    public void setSurname(String surname) {
        this.surname = surname;
    }
    public String getSurname() {
        return surname;
    }
    public void setuser_name(String user_name) {
        this.username = user_name;
    }
    public String getuser_name() {
        return username;
    }
    public void setPhonenum(int phonenum) {
        this.phonenum = phonenum;
    }
    public int getPhonenum() {
        return phonenum;
    }

    @Override
    public String toString() {
        return "acc_Num: " + accountNumber + "\n" +
                "f_name: " + firstname + "\n" +
                "s_name: " + surname + "\n" +
                "u_name: " + username + "\n" +
                "p_Num: " + phonenum + "\n" ;
    }
}

