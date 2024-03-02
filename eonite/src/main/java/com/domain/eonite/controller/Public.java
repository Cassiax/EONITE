package com.domain.eonite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.domain.eonite.entity.Category;
import com.domain.eonite.entity.Domicile;
import com.domain.eonite.service.PublicService;

@RestController
@RequestMapping("/public")
public class Public {
    @Autowired
    private PublicService publicService;

    @GetMapping("/category")
    public Iterable<Category> getAllCategory() {
        return publicService.findAllCategory();
    }

    @GetMapping("/domicile")
    public Iterable<Domicile> getAllDomicle() {
        return publicService.findAllDomicile();
    }
    
}
