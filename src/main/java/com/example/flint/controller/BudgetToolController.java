package com.example.flint.controller;

import com.example.flint.model.BudgetTool;
import com.example.flint.repository.BudgetToolRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/users")

@CrossOrigin(origins="http://localhost:3000")
public class BudgetToolController {

        private BudgetToolRepository budgetRepository;

        public BudgetToolController(BudgetToolRepository budgetRepository){
            super();
            this.budgetRepository = budgetRepository;
        }

        @GetMapping("/budget_tool")
        Collection<BudgetTool> budgetItems(){
            log.info("Getting all Budget Items");
            return budgetRepository.findAll();
        }
        @GetMapping("/budget_tool/{id}")
        ResponseEntity<?> getBudgetItem(@PathVariable Long id){
            log.info("Getting category item by {}", id);

            Optional<BudgetTool> expense = budgetRepository.findById(id);
            return ((Optional<?>) expense).map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        }
        @GetMapping("/{user}/budget_tool")
        Collection<BudgetTool> getBudgetItem(@PathVariable String user) throws InterruptedException {
            log.info("Getting all Budget Items for {}", user);
            Thread.sleep(500);
            return budgetRepository.findByUser(user);
        }
        @PostMapping("/budget_tool")
        ResponseEntity<BudgetTool> createCategory(@Valid @RequestBody BudgetTool budgetItem) throws URISyntaxException {
            BudgetTool result=budgetRepository.save(budgetItem);
            return ResponseEntity.created(new URI("/users/budget_tool" + result.getId())).body(result);
        }

        @PutMapping("/budget_tool/{id}")
        ResponseEntity <BudgetTool> updateCategory(@Valid @RequestBody BudgetTool budgetItem) throws URISyntaxException {
            BudgetTool result=budgetRepository.save(budgetItem);
            return ResponseEntity.ok().body(result);
        }

        @DeleteMapping("/budget_tool/{id}")
        ResponseEntity<?> deleteCategory(@PathVariable Long id){
            budgetRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
}
