package com.example.flint.controller;


import com.example.flint.model.BankAccount;
import com.example.flint.model.Transaction;
import com.example.flint.service.BankAccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.math.BigDecimal;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api")
public class BankAccountController {

    @Autowired
    BankAccountService bankAccountServe;

    //Create a new account
    @RequestMapping(value = "bankaccount", method = RequestMethod.POST)
    public ResponseEntity<Void> create(@RequestBody BankAccount bankAccount) { //UriComponentsBuilder ucBuilder
        log.info("Opening new account");
        Long id = bankAccount.getId();
        if (bankAccountServe.exists(id)) {
            log.info("Account already exists...");
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        bankAccountServe.createNewBankAccount(bankAccount);
        //        HttpHeaders headers = new HttpHeaders();
        //        headers.setLocation(ucBuilder.path("/bankaccount/{id}").buildAndExpand(bankAccount.getId().toUri()));
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }

    //Update account
    @RequestMapping(value = "/bankaccount/{id}", method = RequestMethod.PUT)
    ResponseEntity<BankAccount> updateBankAccount(@Valid @RequestBody BankAccount bankAccount)
            throws URISyntaxException {
        BankAccount result = bankAccountServe.updateBankAccount(bankAccount);
        return ResponseEntity.ok().body(result);
    }

    //Get a list of all accounts (by user eventually)
    @RequestMapping(value = "/bankaccount", method = RequestMethod.GET)
    public ResponseEntity<List<BankAccount>> findAll() {
        log.info("Getting all bank accounts");
        List<BankAccount> bankAccountList = bankAccountServe.getAllBankAccounts();
        if (bankAccountList == null || bankAccountList.isEmpty()) {
            log.info("No bank accounts found...");
            return new ResponseEntity<List<BankAccount>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<BankAccount>>(bankAccountList, HttpStatus.OK);
    }

    //Get particular account by id
    @RequestMapping(value = "/bankaccount/{id}", method = RequestMethod.GET)
    public ResponseEntity<BankAccount> get(@PathVariable("id") Long id) {
        log.info("Getting bank account");
        Optional<BankAccount> bankAccount = bankAccountServe.getBankAccount(id);
        return bankAccount.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //Delete an account
    @RequestMapping(value = "/bankaccount/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        log.info("Deleting bank account #" + id);
        Optional<BankAccount> bankAccount = bankAccountServe.getBankAccount(id);

        if (!bankAccount.isPresent()) {
            log.info("Unable to delete, account with id #:" + id + "not found");
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }
        bankAccountServe.deleteAccount(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    //deposit
    @PostMapping("/deposit")
    public ResponseEntity<Void> deposit(@RequestBody Transaction transaction) {
        bankAccountServe.deposit(transaction.getPrimaryAccountNumber(),
                transaction.getTransactionAmount());
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    //withdraw
    @PostMapping("/withdraw")
    public ResponseEntity<Void> withdraw(@RequestBody Transaction transaction) {
        bankAccountServe.withdraw(transaction.getPrimaryAccountNumber(),
                transaction.getTransactionAmount());
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    //transfer
    @PostMapping("/transfer")
    public ResponseEntity<Void> transfer(@RequestBody Transaction transaction) {
        bankAccountServe.transfer(transaction.getPrimaryAccountNumber(), transaction.getSecondaryAccountNumber(),
                transaction.getTransactionAmount());
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
