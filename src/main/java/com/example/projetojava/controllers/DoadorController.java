package com.example.projetojava.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class DoadorController {

    @RequestMapping("/")
    public String Doador(){
        return "CadastroDoadores";
    }        
    }
    
