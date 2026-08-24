package main.java.cr.ac.ucr.paraiso.ie.C36342.laboratorio2.controller;

import java.util.ArrayList;
import java.util.List;

import main.java.cr.ac.ucr.paraiso.ie.C36342.laboratorio2.domain.Libro;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/libros")
public class LibroController {

    private List<Libro> libros = new ArrayList<>();

    public LibroController() {
        libros.add(new Libro("Clean Code", "Robert C. Martin", "Técnico", 2008, true,
                "Un libro fundamental para aprender a escribir código limpio."));
        libros.add(new Libro("Única mirando al mar", "Fernando Contreras Castro", "Novela", 1993, false,
                "Gran novela costarricense sobre la realidad social del país."));
        libros.add(new Libro("Introduction to Algorithms", "Thomas H. Cormen", "Técnico", 1990, false,
                "Referencia clásica para el análisis y diseño de algoritmos."));
    }

    @GetMapping
    public List<Libro> obtenerLibros() {
        return libros;
    }

    @PostMapping
    public ResponseEntity<?> agregarLibro(@RequestBody Libro libro) {
        if (libro.getTitulo() == null || libro.getAutor() == null || libro.getTitulo().trim().isEmpty()
                || libro.getAutor().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("El título y el autor son obligatorios.");
        }
        if (libro.getAnioPublicacion() > 2026) {
            return ResponseEntity.badRequest().body("El año de publicación no puede ser mayor a 2026.");
        }

        libros.add(libro);
        return new ResponseEntity<>(libro, HttpStatus.CREATED);
    }

}
