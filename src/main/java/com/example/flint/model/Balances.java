package com.example.flint.model;

import java.math.BigDecimal;
import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Data
@Table(name="balances")
public class Balances {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    Long id;

    @Column(name="balances")
    BigDecimal balances;

    @Column(name="timeStamp")
    Instant timeStamp;

    @ManyToOne
    @JsonIgnoreProperties(value={"bankAccount"}, allowSetters = true)
    BankAccount bankAccount;
}
