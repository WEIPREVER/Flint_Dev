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

//        @GetMapping("/{user}/budget_tool")
//        Collection<BudgetTool> budgetItems(@PathVariable String user){
//            log.info("Getting all Budget Items");
//            return budgetRepository.findAll();
//        }

        @GetMapping("/{user}/budget_tool/{id}")
        ResponseEntity<?> getBudgetItem(@PathVariable String user, @PathVariable Long id){
            //works
            log.info("Getting category item by {} and {}", user, id);

            Optional<BudgetTool> expense = budgetRepository.findByUserAndId(user,id);
            return ((Optional<?>) expense).map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        }
        @GetMapping("/{user}/budget_tool")
        Collection<BudgetTool> getBudgetItems(@PathVariable String user) throws InterruptedException {
            //works
            log.info("Getting all Budget Items for {}", user);
            Thread.sleep(500);
            return budgetRepository.findByUser(user);
        }
        @PostMapping("/{user}/budget_tool")
        ResponseEntity<BudgetTool> createBudgetTool(@Valid @RequestBody BudgetTool budgetItem) throws URISyntaxException {
            BudgetTool result=budgetRepository.save(budgetItem);
            return ResponseEntity.created(new URI("/users/budget_tool" + result.getId())).body(result);
        }

        @PutMapping("/{user}/budget_tool/{id}")
        ResponseEntity <BudgetTool> updateBudgetTool(@Valid @RequestBody BudgetTool budgetItem, @PathVariable String user) throws URISyntaxException {
            BudgetTool result=budgetRepository.save(budgetItem);
            return ResponseEntity.ok().body(result);
        }

         @DeleteMapping("/{user}/budget_tool/{id}")
         ResponseEntity<?> deleteBudgetTool(@PathVariable String user, @PathVariable Long id){
            budgetRepository.deleteByUserAndId(user,id);
             return ResponseEntity.ok().build();
         }

}
