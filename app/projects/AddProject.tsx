"use client";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function AddProject({ onProjectAdded }: { onProjectAdded: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveDemo, setLiveDemo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!title || !description || !techStack) {
      setError("Por favor, completa los campos obligatorios.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/projects", {
        title,
        description,
        tech_stack: techStack,
        github_link: githubLink || null,
        live_demo: liveDemo || null,
      });

      // Limpiar formulario después de agregar el proyecto
      setTitle("");
      setDescription("");
      setTechStack("");
      setGithubLink("");
      setLiveDemo("");

      // Actualizar lista de proyectos
      onProjectAdded();
    } catch (error) {
      setError("Error al agregar el proyecto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8 w-full max-w-2xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">➕ Añadir Proyecto</h2>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Título del proyecto *"
          className="input-field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descripción del proyecto *"
          className="input-field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tecnologías utilizadas *"
          className="input-field"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
        />
        <input
          type="url"
          placeholder="Enlace GitHub"
          className="input-field"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
        />
        <input
          type="url"
          placeholder="Demo Online (opcional)"
          className="input-field"
          value={liveDemo}
          onChange={(e) => setLiveDemo(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium shadow-md hover:scale-105 transition-all duration-300"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Añadir Proyecto"}
        </button>
      </div>
    </motion.form>
  );
}
