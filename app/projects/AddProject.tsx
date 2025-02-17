"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { motion } from "framer-motion";

interface AddProjectProps {
  onProjectAdded: () => void;
}

export default function AddProject({ onProjectAdded }: AddProjectProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveDemo, setLiveDemo] = useState("");
  const [clientName, setClientName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [duration, setDuration] = useState("");
  const [featured, setFeatured] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [projectId, setProjectId] = useState<number | null>(null); // ✅ ID del proyecto
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      e.preventDefault();
      setTags([...tags, e.currentTarget.value.trim()]);
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = async (projectId: number) => {
    if (!imageFiles.length) return;

    const formData = new FormData();
    imageFiles.forEach((file) => formData.append("images[]", file)); // ✅ Subir múltiples imágenes
    formData.append("project_id", projectId.toString()); // ✅ Enviar ID del proyecto

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload-images`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("✅ Imágenes subidas:", response.data);
    } catch (error) {
      console.error("❌ Error al subir las imágenes:", error);
      setError("Error al subir las imágenes. Inténtalo de nuevo.");
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const projectData = {
        title,
        description,
        tech_stack: techStack,
        github_link: githubLink?.trim() || null,
        live_demo: liveDemo?.trim() || null,
        video_url: videoUrl?.trim() || null,
        client_name: clientName?.trim() || null,
        project_type: projectType?.trim() || null,
        duration: duration?.trim() || null,
        featured,
        tags,  // ✅ Enviar directamente como array
        image_url: imageUrl?.trim() || null,
    };

    console.log("📤 Enviando proyecto:", projectData); // ✅ Depuración

    try {
        const createdProject = await axios.post(
            "http://127.0.0.1:8000/api/projects",
            projectData,
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("✅ Proyecto creado con ID:", createdProject.data.id);
        setProjectId(createdProject.data.id);

        if (imageFiles.length) {
            await handleImageUpload(createdProject.data.id);
        }

        // ✅ Resetear formulario
        setTitle("");
        setDescription("");
        setTechStack("");
        setGithubLink("");
        setLiveDemo("");
        setVideoUrl(""); // ✅ Resetear correctamente el campo de video
        setClientName("");
        setProjectType("");
        setDuration("");
        setFeatured(false);
        setTags([]); // ✅ Resetear como array vacío
        setImageUrl("");
        setImageFiles([]);

        onProjectAdded();
    } catch (error) {
        console.error("❌ Error al agregar el proyecto:", error);
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

      {projectId && (
        <p className="text-green-600 font-semibold mt-4">
          ✅ Proyecto creado con éxito. ID: {projectId}
        </p>
      )}


      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <div className="grid grid-cols-1 gap-4">
        <label>
          <span className="text-gray-700 dark:text-white">Título *</span>
          <input
            type="text"
            placeholder="Ej: Portfolio Web"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          <span className="text-gray-700 dark:text-white">Descripción *</span>
          <textarea
            placeholder="Describe tu proyecto"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          <span className="text-gray-700 dark:text-white">Tecnologías *</span>
          <input
            type="text"
            placeholder="Ej: React, Laravel, Tailwind"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            required
          />
        </label>

        <label>
          <span className="text-gray-700 dark:text-white">GitHub</span>
          <input
            type="url"
            placeholder="URL del repositorio"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
          />
        </label>

        <label>
          <span className="text-gray-700 dark:text-white">Demo Online</span>
          <input
            type="url"
            placeholder="URL de la demo"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={liveDemo}
            onChange={(e) => setLiveDemo(e.target.value)}
          />
        </label>

        <label>
          <span className="text-gray-700 dark:text-white">Subir Imágenes</span>
          <input
            type="file"
            multiple
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
          />
        </label>

        <label>
          <span className="text-gray-700 dark:text-white">Video (URL de YouTube o Vimeo)</span>
          <input
            type="url"
            placeholder="URL del video de demostración"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </label>


        <label>
          <span className="text-gray-700 dark:text-white">Etiquetas</span>
          <input
            type="text"
            placeholder="Ej: React, TypeScript (Presiona Enter)"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            onKeyDown={handleTagInput}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm">
                {tag} <button type="button" onClick={() => removeTag(tag)}>❌</button>
              </span>
            ))}
          </div>
        </label>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium shadow-md hover:scale-105 transition-all duration-300" disabled={loading}>
          {loading ? "Guardando..." : "Añadir Proyecto"}
        </button>
      </div>
    </motion.form>
  );
}
