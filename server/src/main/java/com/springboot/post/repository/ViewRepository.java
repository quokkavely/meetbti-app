package com.springboot.post.repository;

import com.springboot.post.entity.View;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViewRepository extends JpaRepository<View,Long> {
}
