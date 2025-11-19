package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "entries")

public class Entry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String word;
    private String wordtype;
    private String definition;

    public String getWord() { 
        return word; 
    }
    public void setWord(String word) { 
        this.word = word; 
    }

    public String getWordtype() { 
        return wordtype; 
    }
    public void setWordtype(String wordtype) { 
        this.wordtype = wordtype; 
    }

    public String getDefinition() { 
        return definition; 
    }
    public void setDefinition(String definition) { 
        this.definition = definition; 
    }
}
