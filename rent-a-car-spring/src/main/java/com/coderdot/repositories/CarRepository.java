package com.coderdot.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.coderdot.entities.Car;

@Repository

    public interface CarRepository extends JpaRepository<Car, Long>
    {

    }

