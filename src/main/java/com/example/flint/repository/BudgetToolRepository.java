package com.example.flint.repository;

import com.example.flint.model.BudgetTool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins="http://localhost:3000")
public interface BudgetToolRepository extends JpaRepository<BudgetTool, Long> {
    Collection <BudgetTool> findByUser(String user);
    Optional<BudgetTool> findById(Long id);
    Optional <BudgetTool> findByNameOfExpense(String nameOfExpense);
    Optional <BudgetTool> findByAmountSpent (BigDecimal amountSpent);
    Optional<BudgetTool> findByUserAndId(String user, Long id);

    @Transactional
    Long deleteByUserAndId(@Param("user") String user, @Param("id") Long id);
}
