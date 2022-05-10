package com.example.flint.service;

import java.util.List;
import java.util.Optional;

import com.example.flint.model.Balances;
import com.example.flint.model.BankAccount;
import com.example.flint.repository.BalanceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BalanceService {
    
    @Autowired
    BalanceRepository balanceRepo;

    public List<Balances> getBalances(Optional bankAccount) {
        
        return balanceRepo.findByBankAccountOrderByTimeStampAsc(bankAccount);
    }

    public void saveBalance(Balances balance) {
        balanceRepo.save(balance);
    }
}


