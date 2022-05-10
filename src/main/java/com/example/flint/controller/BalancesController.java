package com.example.flint.controller;

import java.util.List;
import java.util.Optional;

import com.example.flint.model.Balances;
import com.example.flint.model.BankAccount;
import com.example.flint.service.BalanceService;
import com.example.flint.service.BankAccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins="http://localhost:3000")
public class BalancesController {
    
 @Autowired
 BalanceService balanceServ;

 @Autowired
 BankAccountService bankServe;
    
//Get a list of all balances 
@RequestMapping(value = "/{user}/balances/{id}", method = RequestMethod.GET)
public ResponseEntity<List<Balances>> findAll(@PathVariable String user, @PathVariable Long id) {
    Optional<BankAccount> bankAccount = bankServe.findByUserAndId(user, id);
    List<Balances> balances = balanceServ.getBalances( bankAccount);
    if (balances == null || balances.isEmpty()) {
        return new ResponseEntity<List<Balances>>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<List<Balances>>(balances, HttpStatus.OK);
}
}
