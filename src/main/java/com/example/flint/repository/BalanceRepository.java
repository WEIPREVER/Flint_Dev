package com.example.flint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.example.flint.model.Balances;
import com.example.flint.model.BankAccount;



@Repository
public interface BalanceRepository extends JpaRepository<Balances,Long> {
    List<Balances> findByBankAccountOrderByTimeStampAsc(BankAccount bankAccount);
}
