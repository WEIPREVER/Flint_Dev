package com.example.flint.controller;

import com.example.flint.model.StartingBudget;
import com.example.flint.repository.StartingBudgetRepository;
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
public class SBController {

    private StartingBudgetRepository sbRepo;

    public SBController(StartingBudgetRepository sbRepo){
        super();
        this.sbRepo = sbRepo;
    }


    @GetMapping("/{user}/starting_budget/{id}")
    ResponseEntity<?> getSbItem(@PathVariable String user, @PathVariable Long id){
        log.info("Getting budget item by {} and {}", user, id);

        Optional<StartingBudget> expense = sbRepo.findByUserAndId(user,id);
        return ((Optional<?>) expense).map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping("/{user}/starting_budget")
    Collection<StartingBudget> getSbItems(@PathVariable String user) throws InterruptedException {
        log.info("Getting all Budget Items for {}", user);
        Thread.sleep(500);
        return sbRepo.findByUser(user);
    }
    @PostMapping("/{user}/starting_budget")
    ResponseEntity<StartingBudget> createSbItem(@Valid @RequestBody StartingBudget sbItem) throws URISyntaxException {
        StartingBudget result= sbRepo.save(sbItem);
        return ResponseEntity.created(new URI("/users/" + result.getUser() + "starting_budget/" + result.getId())).body(result);
    }

    @PutMapping("/{user}/starting_budget/{id}")
    ResponseEntity <StartingBudget> updateSB(@Valid @RequestBody StartingBudget sbItem, @PathVariable String user) throws URISyntaxException {
        StartingBudget result=sbRepo.save(sbItem);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/{user}/starting_budget/{id}")
    ResponseEntity<?> deleteSbItem(@PathVariable String user, @PathVariable Long id){
        sbRepo.deleteByUserAndId(user,id);
        return ResponseEntity.ok().build();
    }
}
