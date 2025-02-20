-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-02-2025 a las 16:32:44
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `portfolio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(14, '2014_10_12_000000_create_users_table', 1),
(15, '2014_10_12_100000_create_password_resets_table', 1),
(16, '2019_08_19_000000_create_failed_jobs_table', 1),
(17, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(18, '2025_02_10_191450_create_projects_table', 1),
(19, '2025_02_16_174002_create_project_images_table', 1),
(20, '2025_02_19_195234_add_video_url_to_projects_table', 2),
(21, '2025_02_20_121021_add_image_url_to_projects_table', 3),
(22, '2025_02_20_123917_add_is_main_to_project_images', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `tech_stack` varchar(255) NOT NULL,
  `github_link` varchar(255) DEFAULT NULL,
  `live_demo` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `client_name` varchar(255) DEFAULT NULL,
  `project_type` varchar(255) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `projects`
--

INSERT INTO `projects` (`id`, `title`, `description`, `tech_stack`, `github_link`, `live_demo`, `video_url`, `image_url`, `tags`, `featured`, `client_name`, `project_type`, `duration`, `created_at`, `updated_at`) VALUES
(4, 'Prueba nuevo formulario', 'Prueba nuevo formulario Prueba nuevo formulario Prueba nuevo formulario Prueba nuevo formulario Prueba nuevo formulario Prueba nuevo formulario Prueba nuevo formulario Prueba nuevo formulario Prueba nuevo formulario Prueba nuevo formulario', 'Laravel', 'https://github.com/rafacoding4u/LasCuentasClaras', 'http://www.lacuentaclara.com/', 'https://www.youtube.com/watch?v=unvDaEYnc_I', NULL, '\"[\\\"React\\\",\\\"TypeScript\\\"]\"', 0, 'Proyecto Fin de Grado DAW', 'Fin de Grado DAW', '3 meses', '2025-02-20 14:25:37', '2025-02-20 14:25:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `project_images`
--

CREATE TABLE `project_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_main` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `project_images`
--

INSERT INTO `project_images` (`id`, `project_id`, `image_url`, `is_main`, `created_at`, `updated_at`) VALUES
(1, 4, 'http://127.0.0.1:8000/storage/projects/T77Dv76Kr15D6Sl5cTZDZmNZIZIjIqKu9X3CxE4i.png', 0, '2025-02-20 14:25:40', '2025-02-20 14:25:40'),
(2, 4, 'http://127.0.0.1:8000/storage/projects/r0ctUqDeZhz4BJZNVzGITsaxBQh0KvwJDNtYqSOW.png', 0, '2025-02-20 14:25:40', '2025-02-20 14:25:40'),
(3, 4, 'http://127.0.0.1:8000/storage/projects/XcRyOWDg1j75Zj0Ch8hU4BWHKxsTkjBWkRhH9uF6.png', 0, '2025-02-20 14:25:40', '2025-02-20 14:25:40'),
(4, 4, 'http://127.0.0.1:8000/storage/projects/dN6kLYLSToPXbOHEaFTu6cwahh9k5L10Sfg2QkoD.png', 0, '2025-02-20 14:25:40', '2025-02-20 14:25:40'),
(5, 4, 'http://127.0.0.1:8000/storage/projects/mwxNtmrXyOMC48jSZr3TxrqOfDUy2xfMSMlYn1mr.png', 0, '2025-02-20 14:25:40', '2025-02-20 14:25:40'),
(6, 4, 'http://127.0.0.1:8000/storage/projects/BtSWC8ykOhkC7hhJWQml4Sfsov7NOZN2SvUne1uG.png', 0, '2025-02-20 14:25:40', '2025-02-20 14:25:40'),
(7, 4, 'http://127.0.0.1:8000/storage/projects/kh9K9Fp8KXnTZb5gSLlRqVmWlm3t1NLtjr05KCJf.png', 0, '2025-02-20 14:25:40', '2025-02-20 14:25:40'),
(8, 4, 'http://127.0.0.1:8000/storage/projects/qU27qr5kKvrseBk31szsj4fwhSiv6vWeUjj1sra9.png', 0, '2025-02-20 14:25:40', '2025-02-20 14:25:40'),
(9, 4, 'http://127.0.0.1:8000/storage/projects/hnaaV9wpb8cFkO38IpVSTxzbHiQ6XrV9SzWkc9cm.png', 0, '2025-02-20 14:25:40', '2025-02-20 14:25:40'),
(10, 4, 'http://127.0.0.1:8000/storage/projects/6Scx2U8pChEMnVMYRi8LfaPBKS6cQegGkbUsHhym.png', 0, '2025-02-20 14:25:40', '2025-02-20 14:25:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `project_images`
--
ALTER TABLE `project_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_images_project_id_foreign` (`project_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `project_images`
--
ALTER TABLE `project_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `project_images`
--
ALTER TABLE `project_images`
  ADD CONSTRAINT `project_images_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
