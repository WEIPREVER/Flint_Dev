package com.example.flint.repository;

import com.example.flint.model.Transaction;
import com.example.flint.model.enumeration.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByPrimaryAccountNumberAndDateOfTransaction(Long id, Instant dateOfTransaction);

    List<Transaction> findByPrimaryAccountNumberAndDateOfTransactionIsBetween(
            Long id,
            Instant dateOfTransactionStart,
            Instant dateOfTransactionEnd);

    List<Transaction> findByPrimaryAccountNumber(Long fromAccountNumber);

    List<Transaction> findBySecondaryAccountNumber(Long toAccountNumber);

    List<Transaction> findByPrimaryAccountNumberAndTypeOfTransaction(Long id, TransactionType typeOfTransaction);

    List<Transaction> findByPrimaryAccountNumberAndTransactionAmountIsBetween(
            Long id,
            BigDecimal transactionAmountStart,
            BigDecimal transactionAmountEnd);

    List<Transaction> findByPrimaryAccountNumberAndTransactionAmountIsGreaterThanEqual(Long id, BigDecimal transactionAmount);

    List<Transaction> findByPrimaryAccountNumberAndTransactionAmountLessThanEqual(Long id, BigDecimal transactionAmount);

    List<Transaction> findByPrimaryAccountNumberAndCategory_Id(Long id, Long id1);

}
