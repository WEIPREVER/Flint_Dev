package com.example.flint.model;

import lombok.*;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "budget_tool")
public class BudgetTool implements Serializable {



    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user")
    private String user;

    @Column(name = "amount_spent", precision = 21, scale = 2)
    private BigDecimal amountSpent;

    @Column(name = "name_of_expense")
    private String nameOfExpense;

    @Column(name = "date_of_expense")
    private LocalDate dateOfExpense;

    @Column(name = "category")
    private String category;


    @Override
    public String toString() {
        return "BudgetTool{" +
            "id=" + id +
            ", user=" + user +
            ", amountSpent=" + amountSpent +
            ", nameOfExpense='" + nameOfExpense + '\'' +
            ", dateOfExpense=" + dateOfExpense +
            ", category=" + category +
            '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BudgetTool)) return false;
        BudgetTool that = (BudgetTool) o;
        return Objects.equals(id, that.id) && Objects.equals(user, that.user) && Objects.equals(amountSpent, that.amountSpent) && Objects.equals(nameOfExpense, that.nameOfExpense) && Objects.equals(dateOfExpense, that.dateOfExpense) && Objects.equals(category, that.category);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, amountSpent, nameOfExpense, dateOfExpense, category);
    }
}
