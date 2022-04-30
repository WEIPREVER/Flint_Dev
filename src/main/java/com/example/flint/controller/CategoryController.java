package com.example.flint.controller;

import com.example.flint.model.Category;
import com.example.flint.repository.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api")
public class CategoryController {
    private CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository){
        super();
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/categories")
    Collection<Category> categories(){
        log.info("Getting all Categories");
        return categoryRepository.findAll();
    }
    @GetMapping("category/{id}")
    ResponseEntity<?> getCategory(@PathVariable Long id){
       Optional<Category> category = categoryRepository.findById(id);
        return category.map(response -> ResponseEntity.ok().body(response))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @PostMapping("/category")
    ResponseEntity<Category> createCategory(@Valid @RequestBody Category category)
}