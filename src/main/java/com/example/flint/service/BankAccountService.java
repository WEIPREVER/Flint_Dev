package com.example.flint.service;

import com.example.flint.model.Balances;
import com.example.flint.model.BankAccount;
import com.example.flint.model.Transaction;
import com.example.flint.model.enumeration.TransactionType;
import com.example.flint.repository.BankAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class BankAccountService {

    @Autowired
    BankAccountRepository bankAccountRepo;

    @Autowired
    BalanceService balanceService;

    @Autowired
    TransactionServices transactionServices;

    //Get all bank accounts
    public List<BankAccount> getAllBankAccounts() {
        return (List<BankAccount>) bankAccountRepo.findAll();
    }

    //Get an account by id
    public Optional<BankAccount> getBankAccount(Long id) {
        return bankAccountRepo.findById(id);
    }

    //Get balance
    public BigDecimal getBankAccountBalance(Long id) {
        BankAccount bankAccount = bankAccountRepo.getById(id);
            return bankAccount.getBalance();
    }

    //Create a new account
    public BankAccount createNewBankAccount(BankAccount bankAccount) {
        return save(bankAccount);
    }

    //save
    public BankAccount save(BankAccount bankAccount) {
        Balances balance = new Balances();
        balance.setTimeStamp(Instant.now());
        balance.setBankAccount(bankAccount);
        balance.setBalances(bankAccount.getBalance());
        balanceService.saveBalance(balance);
        return bankAccountRepo.save(bankAccount);
    }

    //Update a bank account
    public BankAccount updateBankAccount(BankAccount bankAccount){return save(bankAccount);}

    //Delete an account
    public void deleteAccount(Long id) { bankAccountRepo.deleteById(id);}


    public boolean exists(Long id) {
        bankAccountRepo.existsById(id);
        return false;
    }

    //Deposit method
    public BigDecimal deposit(Long id, BigDecimal input) throws IllegalArgumentException{
        BankAccount bankAccount = bankAccountRepo.getById(id);
        if (input.compareTo(new BigDecimal("0.00")) >= 0) {
            bankAccount.setBalance(bankAccount.getBalance().add(input));
            transactionServices.create(TransactionType.CREDIT, input, bankAccount);
            save(bankAccount);
            return bankAccount.getBalance();
        } else {
            throw new IllegalArgumentException("Not a valid input");
        }
    }

    //Withdraw Method
    public BigDecimal withdraw(Long id, BigDecimal input) throws IllegalArgumentException {
        BankAccount bankAccount = bankAccountRepo.getById(id);
        if (input.compareTo(new BigDecimal("0.00")) >= 0) {
            bankAccount.setBalance(bankAccount.getBalance().subtract(input));
            transactionServices.create(TransactionType.DEBIT, input, bankAccount);
            save(bankAccount);
            return bankAccount.getBalance();
        }else {
            throw new IllegalArgumentException("Not a valid input");
        }
    }

    //Transfer Method
    public void transfer(Long bankAccountFromId, Long bankAccountToId, BigDecimal transferAmount){
        withdraw(bankAccountFromId, transferAmount);
        deposit(bankAccountToId, transferAmount);
    }
}
