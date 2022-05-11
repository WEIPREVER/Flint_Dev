package com.example.flint.repository;

import com.example.flint.model.BudgetTool;
import com.example.flint.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.Optional;

@Repository
@CrossOrigin(origins="http://localhost:3000")
public interface CategoryRepository extends JpaRepository<Category,Long> {
    Collection<Category> findByUser(String user);
    Category findByName(String name);
    Optional<Category> findByUserAndId(String user, Long id);
    Optional<Category> findById(Long id);

    @Transactional
    Long deleteByUserAndId(@Param("user") String user, @Param("id") Long id);


}
