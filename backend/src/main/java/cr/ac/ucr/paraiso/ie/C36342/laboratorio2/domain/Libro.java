package cr.ac.ucr.paraiso.ie.C36342.laboratorio2.domain;

import java.util.concurrent.atomic.AtomicInteger;

public class Libro {

    private static final AtomicInteger siguienteId = new AtomicInteger(1);

    private int id;
    private String titulo;
    private String autor;
    private String categoria;
    private int anioPublicacion;
    private boolean leido;
    private String resena;

    public Libro() {
        this.id = siguienteId.getAndIncrement();
    }

    public Libro(String titulo, String autor, String categoria,
                 int anioPublicacion, boolean leido, String resena) {
        this();
        setTitulo(titulo);
        setAutor(autor);
        setCategoria(categoria);
        setAnioPublicacion(anioPublicacion);
        setLeido(leido);
        setResena(resena);
    }

    public int getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        validarTextoObligatorio(titulo, "titulo");
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        validarTextoObligatorio(autor, "autor");
        this.autor = autor;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public int getAnioPublicacion() {
        return anioPublicacion;
    }

    public void setAnioPublicacion(int anioPublicacion) {
        if (anioPublicacion > 2026) {
            throw new IllegalArgumentException("El año de publicación no puede ser mayor a 2026");
        }
        this.anioPublicacion = anioPublicacion;
    }

    public boolean isLeido() {
        return leido;
    }

    public void setLeido(boolean leido) {
        this.leido = leido;
    }

    public String getResena() {
        return resena;
    }

    public void setResena(String resena) {
        this.resena = resena;
    }

    private void validarTextoObligatorio(String valor, String campo) {
        if (valor == null || valor.trim().isEmpty()) {
            throw new IllegalArgumentException("El campo " + campo + " es obligatorio");
        }
    }
}
