package com.example.flint.repository;

import com.example.flint.model.BankAccount;
import com.example.flint.model.BudgetTool;
import org.apache.tomcat.util.http.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Repository
@CrossOrigin(origins="http://localhost:3000")
public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {
    Collection<BankAccount> findByUser(String user);
    Optional<BankAccount> findByUserAndId(String user, Long id);

    @Transactional
    Long deleteByUserAndId(@Param("user") String user, @Param("id") Long id);
}
