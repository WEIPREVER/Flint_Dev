package com.example.flint.controller;

import com.example.flint.model.Category;
import com.example.flint.repository.CategoryRepository;
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
public class CategoryController {
    private CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository){
        super();
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/{user}/category")
    Collection<Category> categories(@PathVariable String user){
        log.info("Getting all Category Items for {}", user);
        return categoryRepository.findByUser(user);
    }
    @GetMapping("/{user}/category/{id}")
    ResponseEntity<?> getCategory(@PathVariable Long id, @PathVariable String user){
        log.info("Getting category item by {} and {}", user, id);

        Optional<Category> category = categoryRepository.findByUserAndId(user,id);;
        return category.map(response -> ResponseEntity.ok().body(response))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @PostMapping("/{user}/category")
    ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) throws URISyntaxException {
        Category result = categoryRepository.save(category);
        return ResponseEntity.created(new URI("/users/" + result.getUser() + "category/" + result.getId())).body(result);
    }

        @PutMapping("/{user}/category/{id}")
    ResponseEntity <Category> updateCategory(@Valid @RequestBody Category category) throws URISyntaxException {
        Category result=categoryRepository.save(category);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/{user}/category/{id}")
    ResponseEntity<?> deleteCategory(@PathVariable String user, @PathVariable Long id){
        categoryRepository.deleteByUserAndId(user,id);
        return ResponseEntity.ok().build();
    }
}

