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
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);




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
    if (mainImage) formData.append("main_image", mainImage);
    imageFiles.forEach((image) => formData.append("images[]", image));

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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tech_stack", techStack);
    if (githubLink) formData.append("github_link", githubLink);
    if (liveDemo) formData.append("live_demo", liveDemo);
    if (clientName) formData.append("client_name", clientName);
    if (projectType) formData.append("project_type", projectType);
    if (duration) formData.append("duration", duration);

    // ✅ Corregido `featured`
    formData.append("featured", featured ? "1" : "0"); // ✅ Laravel reconoce 1 como true y 0 como false

    // ✅ Enviar `tags` solo como JSON
    if (tags.length > 0) {
      formData.append("tags", JSON.stringify(tags));
    }


    if (imageUrl) formData.append("image_url", imageUrl);

    // ✅ Agregar imágenes
    imageFiles.forEach((image) => formData.append("images[]", image));

    // ✅ Agregar videos si existen
    if (videoFiles.length > 0) {
      videoFiles.forEach((video) => {
        if (video.type.startsWith("video/")) {
          formData.append("videos[]", video);
        }
      });
    }

    // 🛠️ Depuración antes del POST
    console.log("📤 Enviando proyecto con datos:", Object.fromEntries(formData.entries()));

    try {
      const createdProject = await axios.post(
        "http://127.0.0.1:8000/api/projects",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

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
      setClientName("");
      setProjectType("");
      setDuration("");
      setFeatured(false);
      setTags([]); // 🛠️ Asegurar que se reinician los tags
      setImageUrl("");
      setImageFiles([]);
      setVideoFiles([]);

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
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          <span className="text-gray-700 dark:text-white">Descripción *</span>
          <textarea
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          <span className="text-gray-700 dark:text-white">Imagen Principal *</span>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            onChange={(e) => setMainImage(e.target.files ? e.target.files[0] : null)}
          />
        </label>

        <label>
          <span className="text-gray-700 dark:text-white">Tecnologías *</span>
          <input
            type="text"
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
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
          />
        </label>

        <label>
          <span className="text-gray-700 dark:text-white">Demo Online</span>
          <input
            type="url"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={liveDemo}
            onChange={(e) => setLiveDemo(e.target.value)}
          />
        </label>

        <label>
          <span className="text-gray-700 dark:text-white">Video (URL de YouTube o Vimeo)</span>
          <input
            type="url"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </label>

        <label>
          <span className="text-gray-700 dark:text-white">Imagen Principal (URL)</span>
          <input
            type="url"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>

        <label>
          <span className="text-gray-700 dark:text-white">Cliente</span>
          <input
            type="text"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </label>

        <label>
          <span className="text-gray-700 dark:text-white">Tipo de Proyecto</span>
          <input
            type="text"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
          />
        </label>

        <label>
          <span className="text-gray-700 dark:text-white">Duración</span>
          <input
            type="text"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>

        <label>
          <span className="text-gray-700 dark:text-white">Destacado</span>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="ml-2"
          />
        </label>

        <label>
          <span className="text-gray-700 dark:text-white">Etiquetas</span>
          <input
            type="text"
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
          <span className="text-gray-700 dark:text-white">Subir Video (MP4, MOV, AVI, WMV - Máx. 50MB)</span>
          <input
            type="file"
            accept="video/mp4,video/mov,video/avi,video/wmv"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            multiple
            onChange={(e) => setVideoFiles(Array.from(e.target.files || []))}
          />
        </label>


        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium shadow-md hover:scale-105 transition-all duration-300" disabled={loading}>
          {loading ? "Guardando..." : "Añadir Proyecto"}
        </button>
      </div>
    </motion.form>
  );

}
