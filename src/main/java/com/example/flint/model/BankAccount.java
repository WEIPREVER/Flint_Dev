package com.example.flint.model;

import com.example.flint.model.enumeration.AccountType;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Data
@Table(name="bankAccount")
public class BankAccount implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    Long id;

    @Column(name="accountName")
    String accountName = "";

    @Column(name="balance")
    BigDecimal balance = new BigDecimal(0);

    @Column(name="accountType")
    AccountType accountType;

    public BankAccount(Long id, String accountName, BigDecimal balance, AccountType accountType) {
        this.id = id;
        this.accountName = accountName;
        this.balance = balance;
        this.accountType = accountType;
    }

    public BankAccount() {
    }

//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getAccountName() {
//        return accountName;
//    }
//
//    public void setAccountName(String accountName) {
//        this.accountName = accountName;
//    }
//
//    public BigDecimal getBalance() {
//        return balance;
//    }
//
//    public void setBalance(BigDecimal balance) {
//        this.balance = balance;
//    }
//
//
//    public AccountType getAccountType() {
//        return accountType;
//    }
//
//    public void setAccountType(AccountType accountType) {
//        this.accountType = accountType;
//    }
}
