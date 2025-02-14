"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { motion } from "framer-motion";

interface AddProjectProps {
  onProjectAdded: () => void;
}

export default function AddProject({ onProjectAdded }: AddProjectProps) {
  // Estados para los campos del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveDemo, setLiveDemo] = useState("");

  // Estados para la carga y errores
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Validaciones simples antes de enviar
  const validateFields = () => {
    const errors: Record<string, string> = {};
    if (!title.trim()) errors.title = "El título es obligatorio.";
    if (!description.trim()) errors.description = "La descripción es obligatoria.";
    if (!techStack.trim()) errors.techStack = "Las tecnologías utilizadas son obligatorias.";
    return errors;
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
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

      // Limpia el formulario tras el éxito
      setTitle("");
      setDescription("");
      setTechStack("");
      setGithubLink("");
      setLiveDemo("");

      // Notifica al componente principal para actualizar la lista
      onProjectAdded();
    } catch (error) {
      console.error("Error al agregar el proyecto:", error);
      if (error instanceof AxiosError && error.response?.data?.message) {
        setError(`Error: ${error.response.data.message}`);
      } else {
        setError("Error al agregar el proyecto. Inténtalo más tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8 w-full max-w-2xl border border-gray-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        ➕ Añadir Proyecto
      </h2>

      {/* Mensaje de error global */}
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      {/* Campos del formulario */}
      <div className="grid grid-cols-1 gap-4">
        {/* Título */}
        <div>
          <input
            type="text"
            placeholder="Título del proyecto *"
            className="input-field w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {fieldErrors.title && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.title}</p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <textarea
            placeholder="Descripción del proyecto *"
            className="input-field w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {fieldErrors.description && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.description}</p>
          )}
        </div>

        {/* Tecnologías */}
        <div>
          <input
            type="text"
            placeholder="Tecnologías utilizadas *"
            className="input-field w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            required
          />
          {fieldErrors.techStack && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.techStack}</p>
          )}
        </div>

        {/* Enlace GitHub */}
        <input
          type="url"
          placeholder="Enlace GitHub"
          className="input-field w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
        />

        {/* Enlace Demo */}
        <input
          type="url"
          placeholder="Demo Online (opcional)"
          className="input-field w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          value={liveDemo}
          onChange={(e) => setLiveDemo(e.target.value)}
        />

        {/* Botón de envío */}
        <button
          type="submit"
          className={`bg-blue-600 text-white px-4 py-2 rounded-md font-medium shadow-md hover:scale-105 transition-all duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Añadir Proyecto"}
        </button>
      </div>
    </motion.form>
  );
}
