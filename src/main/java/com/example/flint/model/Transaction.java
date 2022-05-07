package com.example.flint.model;

import com.example.flint.model.enumeration.TransactionType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.math.BigDecimal;

@Entity
@Table(name = "transaction")
public class Transaction implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "date_of_transaction", nullable = false)
    private Instant dateOfTransaction;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type_of_transaction", nullable = false)
    private TransactionType typeOfTransaction;

    @Column(name = "transaction_amount", precision = 21, scale = 2)
    private BigDecimal transactionAmount;

    //secondary account number assigned to the transaction
    @Column(name = "secondary_account_number")
    private Long secondaryAccountNumber;

    //primary account number
    @NotNull
    @Column(name = "primary_account_number")
    private Long primaryAccountNumber;

    @ManyToOne
    private Category category;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user", "category" }, allowSetters = true)
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateOfTransaction() {
        return dateOfTransaction;
    }

    public void setDateOfTransaction(Instant dateOfTransaction) {
        this.dateOfTransaction = dateOfTransaction;
    }

    public TransactionType getTypeOfTransaction() {
        return typeOfTransaction;
    }

    public void setTypeOfTransaction(TransactionType typeOfTransaction) {
        this.typeOfTransaction = typeOfTransaction;
    }

    public BigDecimal getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(BigDecimal transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public Long getSecondaryAccountNumber() {
        return secondaryAccountNumber;
    }

    public void setSecondaryAccountNumber(Long secondaryAccountNumber) {
        this.secondaryAccountNumber = secondaryAccountNumber;
    }

    public Long getPrimaryAccountNumber() {
        return primaryAccountNumber;
    }

    public void setPrimaryAccountNumber(Long primaryAccountNumber) {
        this.primaryAccountNumber = primaryAccountNumber;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
