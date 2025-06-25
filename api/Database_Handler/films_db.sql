-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 24, 2025 at 09:58 PM
-- Server version: 8.0.41
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `films_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `films`
--

DROP TABLE IF EXISTS `films`;
CREATE TABLE IF NOT EXISTS `films` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `img` text NOT NULL,
  `film_desc` text,
  `film_cast` text NOT NULL,
  `film_type` varchar(100) NOT NULL,
  `release_year` text NOT NULL,
  `trailer_link` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `films`
--

INSERT INTO `films` (`id`, `title`, `img`, `film_desc`, `film_cast`, `film_type`, `release_year`, `trailer_link`, `created_at`) VALUES
(1, 'Avengers Infinity War', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQasAWVC623pYLx58F8bb8zALVN-gXWnAW3wQ&amp;s', 'The Avengers and their allies must unite to stop him, leading to a climactic showdown with potentially devastating consequences for the universe. The fate of Earth and existence itself hangs in the balance as they face Thanos&#039;s ambition.', 'Robert Downey Jr., Chris Evans', 'MOVIE', '2018', 'https://www.youtube.com/embed/6ZfuNTqbHE8?si=D38RqicQ7JeSxfJ2&#039;)', '2025-05-09 16:22:09'),
(2, 'Captain America: The Winter Soldier', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfeGs98TxZWC7P208BRXblrU7_MlTQ0GXUUw&amp;s', 'As Steve Rogers struggles to embrace his role in the modern world, he teams up with a fellow Avenger and S.H.I.E.L.D agent, Black Widow, to battle a new threat from history: an assassin known as the Winter Soldier.', 'Chris Evans, Scarlett Johannson', 'MOVIE', '2014', 'https://www.youtube.com/embed/7SlILk2WMTI?si=iaG2vEN9H0YT3nCW', '2025-05-09 16:42:10'),
(3, 'Man Of Steel', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQSg-95KlVf55oWDNRr3pbELICJ9TgXXKouA&amp;s', 'a superhero film that reimagines the origin story of Superman, focusing on Clark Kent&#039;s journey from an alien child sent to Earth to becoming a symbol of hope and strength for humanity. The movie explores Clark&#039;s struggle to reconcile his alien heritage with his human upbringing and his eventual embrace of his destiny as Superman.', 'Henry Cavill, Amy Adams', 'MOVIE', '2013', 'https://www.youtube.com/embed/T6DJcgm3wNY?si=zPhbDUkj8dK3DMQ4', '2025-05-09 16:54:00'),
(4, 'Daredevil', 'https://resizing.flixster.com/lNAu8OsFvhfsYIZgl9PvqQoAIio=/fit-in/352x330/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p11408531_b_v13_ad.jpg.+.https://pacdn.aoneroom.com/image/2023/02/15/fbd0cf0a6dfbc04fd3c0df9ac213d6d1.jpg?x-oss-process=image/resize%2Cw_300', NULL, 'Charlie Cox.+.Charlie Cox', 'SERIE', '2015.+.2016', 'https://www.youtube.com/embed/jAy6NJ_D5vU?si=GGGEpzDZYm2tJbyU.+.https://www.youtube.com/embed/IMC7H23-sMs?si=9GJMzmokMLY7YCQ3', '2025-05-10 16:11:48'),
(6, 'Castlevania', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZZNm8brbRU4z3xLhMGFW32XnHEfF3mWIIlg&amp;s.+.https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL7SoVkoseZSLtLR6B_ETWdk_e0DL_MbJ8MA&amp;s', NULL, 'Richard Armitage, James Callis, Alejandra Reynoso.+.Richard Armitage, James Callis, Theo James', 'ANIMATED_SERIE', '2017.+.2018', 'https://www.youtube.com/embed/m3jNb7IdJHQ?si=sb_iMlEQMEXs5qRv.+.https://www.youtube.com/embed/Kbb8zPQBmOw?si=S25FbVzIAoqhv1il', '2025-05-14 07:55:27'),
(9, 'The Gorge', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJSEuwUZCm4s_M-IkJUgVMm_bdnNmy8HgVw&amp;s', 'he film &quot;The Gorge&quot; stars Miles Teller and Anya Taylor-Joy and is directed by Scott Derrickson, with a screenplay by Zach Dean. The plot revolves around two highly trained operatives, Levi (Miles Teller) and Drasa (Anya Taylor-Joy), who are stationed in guard towers on opposite sides of a mysterious, classified gorge. They must work together to protect the world from an unknown evil within the gorge, when the cataclysmic threat to humanity is revealed. Sigourney Weaver also stars as Bartholomew', 'Miles Teller, Anya Taylor-Joy, and Sigourney Weaver', 'MOVIE', '2025', 'https://www.youtube.com/embed/rUSdnuOLebE?si=TE9ae8vUVLxVFyeK', '2025-05-29 00:12:29'),
(10, 'The Death of Superman', 'https://upload.wikimedia.org/wikipedia/en/7/72/The_Death_of_Superman_Bluray_cover.jpg', '&quot;The Death of Superman&quot; is a 2018 animated action fantasy film starring Superman as he confronts the formidable Doomsday, leading to a significant event in the superhero&#039;s life. The film is PG-13 rated and runs for 1 hour and 21 minutes. The voice cast includes Jerry O&#039;Connell as Superman, Rebecca Romijn as Lois Lane, and Rainn Wilson as Lex Luthor.', 'Jerry O&#039;Connell, Rebecca Romijn, Rainn Wilson, Rosario Dawson, Nathan Fillion, Jason O&#039;Mara.', 'ANIMATED_MOVIE', '2019', 'https://www.youtube.com/embed/J5aMJ1qMgA8?si=4n_4OB2jQGF6R8sD', '2025-05-29 00:34:48'),
(16, 'The Idea of You', 'https://m.media-amazon.com/images/M/MV5BYzFmYmU0N2YtOGZhNy00MDEyLWJkOWUtMDdhOTVhODNmZTNjXkEyXkFqcGc@._V1_.jpg', 'The film, &quot;The Idea of You,&quot; centers on Solène, a 40-year-old single mom who unexpectedly starts a romance with Hayes Campbell, the lead singer of the boy band August Moon, while chaperoning her daughter at Coachella. The cast includes Anne Hathaway as Solène, Nicholas Galitzine as Hayes, and Ella Rubin as Solène&#039;s daughter Izzy. Other notable cast members include Annie Mumolo, Reid Scott, and Mathilda Gianopoulos. \nThe film follows Solène and Hayes&#039;s budding romance, which faces challenges due to Hayes&#039;s fame and his impact on her life and her daughter&#039;s. The story explores themes of fame, love, and the complexities of a relationship when one partner is a celebrity. The film is based on the novel of the same name by Robinne Lee.', 'Anne Hathaway, Nicholas Galitzine', 'MOVIE', '2024', 'https://www.youtube.com/embed/V8i6PB0gGOA?si=8u51KA9hbpnoKzHI', '2025-05-29 21:54:54'),
(17, 'Night Agent', 'https://resizing.flixster.com/hertkw4AKx4FrF90z1TQWpYYFtE=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vZGIyM2RkMzktNDQ5My00ZDZhLWE1ZTYtNGNlYjBlNjVjYTRkLmpwZw==', NULL, 'Peter Sutherland, Luciane Buchanan, Rose Larkin', 'SERIE', '2023', 'https://www.youtube.com/embed/YDbnY9Obsfs?si=M0MwiqZFC5u3q7pf', '2025-05-29 22:47:03');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
CREATE TABLE IF NOT EXISTS `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `film_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `film_id` (`film_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `film_id`, `name`, `created_at`) VALUES
(1, 1, 'Action', '2025-05-09 16:22:10'),
(2, 1, 'Adventure', '2025-05-09 16:22:10'),
(3, 1, 'Sci-Fi', '2025-05-09 16:22:10'),
(4, 2, 'Action', '2025-05-09 16:42:10'),
(5, 2, 'Adventure', '2025-05-09 16:42:11'),
(6, 2, 'Thriller', '2025-05-09 16:42:11'),
(7, 3, 'Action', '2025-05-09 16:54:00'),
(8, 3, 'Adventure', '2025-05-09 16:54:00'),
(9, 3, 'Sci-Fi', '2025-05-09 16:54:00'),
(10, 3, 'Fantasy', '2025-05-09 16:54:00'),
(11, 4, 'Action', '2025-05-10 16:11:48'),
(12, 4, 'Adventure', '2025-05-10 16:11:49'),
(13, 4, 'Thriller', '2025-05-10 16:11:49'),
(14, 6, 'Adventure', '2025-05-14 07:55:28'),
(15, 6, 'Action', '2025-05-14 07:55:28'),
(16, 6, 'Animation', '2025-05-14 07:55:28'),
(17, 6, 'Thriller', '2025-05-14 07:55:29'),
(18, 6, 'Horror', '2025-05-14 07:55:30'),
(22, 9, 'Adventure', '2025-05-29 00:12:30'),
(23, 9, 'Action', '2025-05-29 00:12:30'),
(24, 9, 'Romance', '2025-05-29 00:12:31'),
(25, 9, 'Sci-Fi', '2025-05-29 00:12:31'),
(26, 10, 'Action', '2025-05-29 00:34:49'),
(27, 10, 'Adventure', '2025-05-29 00:34:49'),
(28, 10, 'Sci-Fi', '2025-05-29 00:34:49'),
(29, 10, 'Animation', '2025-05-29 00:34:49'),
(39, 16, 'Romance', '2025-05-29 21:54:54'),
(40, 17, 'Action', '2025-05-29 22:47:03'),
(41, 17, 'Thriller', '2025-05-29 22:47:03');

-- --------------------------------------------------------

--
-- Table structure for table `records`
--

DROP TABLE IF EXISTS `records`;
CREATE TABLE IF NOT EXISTS `records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user__id` int NOT NULL,
  `film_id` int NOT NULL,
  `upl_id` int NOT NULL,
  `record_type` varchar(30) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user__id` (`user__id`),
  KEY `film_id` (`film_id`),
  KEY `upl_id` (`upl_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `records`
--

INSERT INTO `records` (`id`, `user__id`, `film_id`, `upl_id`, `record_type`, `created_at`) VALUES
(1, 5, 6, 17, 'stream', '2025-05-24 21:16:36'),
(2, 5, 6, 12, 'stream', '2025-05-24 21:17:08'),
(3, 5, 1, 1, 'stream', '2025-05-24 21:18:50'),
(4, 5, 1, 1, 'stream', '2025-05-24 21:27:04'),
(5, 5, 6, 17, 'download', '2025-05-24 21:42:34'),
(6, 5, 3, 3, 'download', '2025-05-24 21:43:58'),
(7, 8, 4, 4, 'stream', '2025-05-24 22:03:34'),
(8, 8, 2, 2, 'stream', '2025-05-24 22:05:47'),
(9, 8, 2, 2, 'download', '2025-05-24 22:06:41'),
(10, 5, 3, 3, 'stream', '2025-05-25 12:42:10'),
(11, 5, 1, 1, 'stream', '2025-05-25 13:01:57'),
(12, 5, 1, 1, 'stream', '2025-05-25 13:01:58'),
(13, 5, 1, 1, 'stream', '2025-05-25 13:11:49'),
(14, 5, 6, 6, 'stream', '2025-05-25 13:13:30'),
(15, 5, 6, 16, 'stream', '2025-05-25 13:13:43'),
(16, 5, 6, 11, 'download', '2025-05-26 17:26:45'),
(17, 8, 1, 1, 'stream', '2025-05-27 20:28:58'),
(18, 5, 1, 1, 'stream', '2025-05-28 18:19:16'),
(19, 8, 1, 1, 'stream', '2025-05-28 19:32:12'),
(20, 8, 1, 1, 'stream', '2025-05-28 19:33:55'),
(21, 8, 1, 1, 'stream', '2025-05-28 19:43:56'),
(22, 8, 6, 17, 'stream', '2025-05-28 19:45:36'),
(23, 8, 4, 5, 'stream', '2025-05-28 19:45:51'),
(24, 8, 2, 2, 'stream', '2025-05-28 19:46:05'),
(25, 8, 3, 3, 'stream', '2025-05-28 20:24:51'),
(26, 8, 6, 17, 'stream', '2025-05-28 22:44:58'),
(27, 8, 10, 19, 'stream', '2025-05-29 00:37:18'),
(28, 8, 9, 18, 'stream', '2025-05-29 00:39:30'),
(29, 8, 10, 19, 'stream', '2025-05-29 21:07:34'),
(30, 8, 16, 20, 'stream', '2025-05-29 21:56:05'),
(31, 8, 9, 18, 'download', '2025-05-29 21:57:04'),
(32, 8, 17, 21, 'stream', '2025-05-30 10:27:15'),
(33, 8, 17, 22, 'stream', '2025-05-30 10:28:12'),
(34, 8, 17, 30, 'stream', '2025-05-30 10:30:47'),
(35, 8, 17, 21, 'stream', '2025-05-30 10:30:55'),
(36, 8, 17, 24, 'stream', '2025-05-30 10:33:38'),
(37, 5, 10, 19, 'stream', '2025-05-30 17:19:49'),
(38, 5, 1, 1, 'stream', '2025-05-30 17:20:16'),
(39, 5, 17, 30, 'stream', '2025-05-30 17:27:26'),
(40, 8, 10, 19, 'stream', '2025-05-31 12:19:33'),
(41, 8, 10, 19, 'download', '2025-05-31 12:19:51'),
(42, 7, 2, 2, 'stream', '2025-05-31 20:17:47'),
(43, 7, 9, 18, 'download', '2025-05-31 20:18:24'),
(44, 7, 10, 19, 'stream', '2025-05-31 20:18:44'),
(45, 8, 10, 19, 'stream', '2025-05-31 20:37:36'),
(46, 8, 1, 1, 'stream', '2025-06-02 12:38:25'),
(47, 8, 9, 18, 'stream', '2025-06-02 19:29:11'),
(48, 8, 6, 12, 'download', '2025-06-02 19:30:13'),
(49, 8, 10, 19, 'stream', '2025-06-02 19:52:52'),
(50, 8, 17, 27, 'stream', '2025-06-04 13:51:47'),
(51, 8, 10, 19, 'stream', '2025-06-06 07:37:03'),
(52, 5, 10, 19, 'stream', '2025-06-06 19:57:45'),
(53, 5, 10, 19, 'stream', '2025-06-06 19:57:45'),
(54, 8, 2, 2, 'download', '2025-06-06 20:05:25'),
(55, 8, 2, 2, 'download', '2025-06-06 20:06:22'),
(56, 8, 10, 19, 'stream', '2025-06-06 21:49:39');

-- --------------------------------------------------------

--
-- Table structure for table `searches`
--

DROP TABLE IF EXISTS `searches`;
CREATE TABLE IF NOT EXISTS `searches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user__id` int NOT NULL,
  `keyword` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user__id` (`user__id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `searches`
--

INSERT INTO `searches` (`id`, `user__id`, `keyword`, `created_at`) VALUES
(1, 5, 'er', '2025-05-19 18:21:59'),
(2, 5, 'castle', '2025-05-19 19:11:10'),
(3, 5, 'castle', '2025-05-19 21:01:00'),
(4, 5, 'man', '2025-05-19 21:04:18'),
(5, 5, 'ereredddfd', '2025-05-19 21:06:21'),
(6, 5, '20', '2025-05-19 21:07:18'),
(7, 5, '2034', '2025-05-19 21:07:23'),
(8, 5, '203', '2025-05-19 21:07:25'),
(9, 5, '201', '2025-05-19 21:07:26'),
(10, 5, '2013', '2025-05-19 21:07:29'),
(11, 5, '2018', '2025-05-19 21:10:55'),
(12, 5, '21', '2025-05-19 21:11:00'),
(13, 5, '2013', '2025-05-19 21:11:02'),
(14, 5, 'MA', '2025-05-19 21:11:05'),
(15, 5, 'CA', '2025-05-19 21:11:07'),
(16, 5, 'man', '2025-05-19 21:11:10'),
(17, 5, 'avengers', '2025-05-19 21:11:17'),
(18, 5, 'CAS', '2025-05-22 15:49:41'),
(19, 5, 'CAS', '2025-05-22 15:49:42'),
(20, 5, 'dared', '2025-05-22 15:58:42'),
(21, 5, 'dared', '2025-05-22 15:58:42'),
(22, 8, 'saas', '2025-05-23 13:51:04'),
(23, 8, 'saas', '2025-05-23 13:51:04'),
(24, 8, 'rwewewewwqwqwq', '2025-05-23 13:52:26'),
(25, 8, 'rwewewewwqwqwq', '2025-05-23 13:52:26'),
(26, 8, 'CASTLE', '2025-05-24 21:57:22'),
(27, 8, 'CASTLE', '2025-05-24 21:57:23'),
(28, 5, 'castle', '2025-05-26 16:44:25'),
(29, 5, 'castle', '2025-05-26 16:44:25'),
(30, 8, 'RES', '2025-05-27 20:28:06'),
(31, 8, 'RES', '2025-05-27 20:28:06'),
(32, 8, 'astrid', '2025-05-27 20:28:12'),
(33, 8, 'avengers', '2025-05-27 20:28:15'),
(34, 8, 'avengers infinity', '2025-05-27 20:28:20'),
(35, 8, 'avengers infinity war', '2025-05-27 20:28:24'),
(36, 8, 'who are you', '2025-05-27 20:33:26'),
(37, 8, 'who are you', '2025-05-27 20:33:26'),
(38, 8, 'what', '2025-05-27 20:33:29'),
(39, 8, 'how', '2025-05-27 20:33:33'),
(40, 8, 'chai', '2025-05-27 20:33:38'),
(41, 8, 'nooo', '2025-05-27 20:33:41'),
(42, 5, 'Action', '2025-05-30 17:18:31'),
(43, 5, 'Action', '2025-05-30 17:18:31'),
(44, 5, 'night agent', '2025-05-30 17:18:57'),
(45, 5, 'chris', '2025-05-30 17:26:14'),
(46, 5, 'chris', '2025-05-30 17:26:14'),
(47, 8, 'superman', '2025-05-31 12:19:27'),
(48, 8, 'superman', '2025-05-31 12:19:27'),
(49, 8, 'weird', '2025-05-31 12:27:00'),
(50, 8, 'weird', '2025-05-31 12:27:00'),
(51, 8, 'wh', '2025-05-31 12:27:03'),
(52, 8, 'whore', '2025-05-31 12:27:06'),
(53, 8, 'wow', '2025-05-31 12:27:09'),
(54, 8, 'what', '2025-05-31 12:27:12'),
(55, 8, 'don&#039;t', '2025-05-31 12:27:15'),
(56, 8, 'nag', '2025-05-31 12:27:18'),
(57, 8, 'na', '2025-05-31 12:27:19'),
(58, 8, 'dfdsfsdfsdfdf', '2025-05-31 14:40:13'),
(59, 8, 'dfdsfsdfsdfdf', '2025-05-31 14:40:13'),
(60, 8, 'avengers', '2025-05-31 14:40:19'),
(61, 8, 'chris', '2025-05-31 14:40:24'),
(62, 7, 'gor', '2025-05-31 20:18:11'),
(63, 7, 'gor', '2025-05-31 20:18:11'),
(64, 8, 'supermana', '2025-05-31 20:37:20'),
(65, 8, 'supermana', '2025-05-31 20:37:20'),
(66, 8, 'superman', '2025-05-31 20:37:25'),
(67, 8, 'EREEREFGDFDFGSD', '2025-05-31 21:42:21'),
(68, 8, 'EREEREFGDFDFGSD', '2025-05-31 21:42:21'),
(69, 8, 'addd', '2025-06-04 09:47:03'),
(70, 8, 'addd', '2025-06-04 09:47:04'),
(71, 8, 'avengers', '2025-06-04 09:47:10'),
(72, 5, 'add', '2025-06-06 17:13:58'),
(73, 5, 'add', '2025-06-06 17:13:58'),
(74, 5, 'adfgfgfd', '2025-06-06 17:15:17'),
(75, 5, 'ave', '2025-06-06 17:17:54'),
(76, 5, 'br', '2025-06-06 17:17:57'),
(77, 5, 'fgdfffg', '2025-06-06 17:33:45'),
(78, 5, 'fgdfffg', '2025-06-06 17:33:45'),
(79, 5, 'a', '2025-06-06 17:33:56'),
(80, 5, 'night', '2025-06-06 19:58:33'),
(81, 5, 'night', '2025-06-06 19:58:34'),
(82, 5, 'RES', '2025-06-09 07:32:31'),
(83, 5, 'RES', '2025-06-09 07:32:33'),
(84, 5, 'what', '2025-06-09 07:32:44'),
(85, 5, 'w', '2025-06-09 07:32:47');

-- --------------------------------------------------------

--
-- Table structure for table `series`
--

DROP TABLE IF EXISTS `series`;
CREATE TABLE IF NOT EXISTS `series` (
  `id` int NOT NULL AUTO_INCREMENT,
  `film_id` int NOT NULL,
  `season` int NOT NULL,
  `episode` int NOT NULL,
  `title` text NOT NULL,
  `episode_desc` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `film_id` (`film_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `series`
--

INSERT INTO `series` (`id`, `film_id`, `season`, `episode`, `title`, `episode_desc`, `created_at`) VALUES
(1, 4, 1, 1, 'Into the Ring', 'Matt Murdock, now a blind lawyer, begins his dual life as a vigilante in Hell&#039;s Kitchen, fighting crime while also opening a law firm with his friend Foggy Nelson. Their first case involves Karen Page, a woman framed for murder after uncovering a money laundering scheme at her construction company.', '2025-05-10 16:11:50'),
(2, 4, 2, 1, 'Bang', 'In the void left by Fisk&#039;s removal, a new threat to Hell&#039;s Kitchen emerges. Murdock and Foggy take on a client with a questionable past. Murdock and Foggy take on a client with a questionable past.In the void left by Fisk&#039;s removal, a new threat to Hell&#039;s Kitchen emerges.', '2025-05-10 16:11:50'),
(3, 6, 1, 1, 'WitchBottle', 'A headstrong young woman seeks out forbidden knowledge; A corrupt bishop courts disaster by enraging a legend.', '2025-05-14 07:55:30'),
(4, 6, 1, 2, 'Necropolis', 'Trevor Belmont drifts into the panicked city of Gresit, where he learns of an ancient evil and makes a surprising vow.', '2025-05-14 07:55:31'),
(5, 6, 1, 3, 'Labyrinth', 'Belmont explores the catacombs of Gresit and makes a disturbing discovery; As night falls on the city, the beasts return for blood.', '2025-05-14 07:55:31'),
(6, 6, 1, 4, 'Monument', 'Belmont battles to save Gresit from certain destruction and in the process comes face to face with a shocking truth', '2025-05-14 07:55:31'),
(7, 6, 2, 1, 'War Council', 'Dracula entrusts a deadly -- and personal -- mission with two humans who truly hate humanity, not knowing that he himself has become a target.', '2025-05-14 07:55:32'),
(8, 6, 2, 2, 'Old Homes', 'As Belmont shares a bold strategy with Alucard and Sypha, Dracula addresses a conflict within his ranks; Isaac recalls a painful encounter.', '2025-05-14 07:55:32'),
(9, 6, 2, 3, 'Shadow Battles', 'focuses on Carmilla playing political games with sinister intent, while Trevor and his companions explore his family&#039;s archives for secrets', '2025-05-14 07:55:33'),
(10, 6, 2, 4, 'Broken Mast', 'Hector and Isaac begin to diverge on their paths. Trevor and Sypha grow closer, and the episode also explores the idea that even vampires can die.', '2025-05-14 07:55:33'),
(11, 6, 2, 5, 'Last Spell', 'In this episode, Carmilla presses on with her plan despite Godbrand&#039;s disappearance, while Sypha makes a significant discovery in the archives.', '2025-05-14 07:55:33'),
(12, 6, 2, 6, 'The River', 'Another city is about to fall to Dracula&#039;s castle, and Dracula himself may be about to fall, at the hand of someone he thought was on his side. Another city is about to fall to Dracula&#039;s castle, and Dracula himself may be about to fall, at the hand of someone he thought was on his side.', '2025-05-14 07:55:34'),
(13, 6, 2, 7, 'For Love', 'It depicts Belmont, Alucard, and Sypha facing their final battle with Dracula, where the future of humanity hangs in the balance', '2025-05-14 07:55:34'),
(14, 6, 2, 8, 'End Times', 'he dead are buried, friends and enemies are scattered, and hard choices are made. The dead are buried, friends and enemies are scattered, and hard choices are made.', '2025-05-14 07:55:35'),
(15, 17, 1, 1, 'The Call', 'While working the night action desk, FBI agent Peter receives a distress call and is soon put in charge of protecting cybersecurity expert Rose.', '2025-05-29 22:47:03'),
(16, 17, 1, 2, 'Redial', 'After looking for a link between the Campbells and the FBI, Peter is forced to go on the run with Rose in search of a hard drive - and more answers.', '2025-05-29 22:47:04'),
(17, 17, 1, 3, 'The Zookeeper', 'Peter teams up with Rose for a risky mission at the White House. Elsewhere, a notable agent joins the security detail for the Vice President&#039;s daughter. Peter teams up with Rose for a risky mission at the White House.', '2025-05-29 22:47:04'),
(18, 17, 1, 4, 'Eyes Only', 'Rose and Peter seek out one of the Campbells&#039; recent contacts and uncover new intel; Monks opens up to Chelsea; Paulo makes a move on Maddie.', '2025-05-29 22:47:05'),
(19, 17, 1, 5, 'The Marionette', 'Peter visits someone close to Hawkins. Rose makes a key connection. Maddie&#039;s night out takes a dangerous turn, spurring the Secret Service into action.', '2025-05-29 22:47:05'),
(20, 17, 1, 6, 'Fathoms', 'With assassins hot on their trail, Peter and Rose split up en route to the White House. A shocking discovery quickly puts their lives in jeopardy. With assassins hot on their trail, Peter and Rose split up en route to the White House.', '2025-05-29 22:47:05'),
(21, 17, 1, 7, 'Best Served Cold', 'Now in hiding, Peter and Rose grow closer and investigate a potential bombing suspect. At the White House, the conspirators obtain a disturbing tape. Now in hiding, Peter and Rose grow closer and investigate a potential bombing suspect.', '2025-05-29 22:47:05'),
(22, 17, 1, 8, 'Redux', 'The episode sees Peter and Rose, now in hiding, investigate a potential bombing suspect, while the White House conspirators obtain a disturbing tape, according to the The Night Agent Wiki. More truths about the bombing suspect&#039;s identity emerge, and Chelsea and Peter race to find Maddie after she sends a coded message.', '2025-05-29 22:47:05'),
(23, 17, 1, 9, 'The Devil we Know', 'After new revelations surface, Peter and Rose scramble to find more evidence with help from Chelsea and Maddie. A bigger threat looms at Camp David.', '2025-05-29 22:47:06'),
(24, 17, 1, 10, 'Fathers', 'With lives at stake, the group tries to stop a nefarious plot before it&#039;s too late. In the aftermath, Peter confronts the past and begins a new chapter.', '2025-05-29 22:47:06');

-- --------------------------------------------------------

--
-- Table structure for table `uploads`
--

DROP TABLE IF EXISTS `uploads`;
CREATE TABLE IF NOT EXISTS `uploads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `film_id` int NOT NULL,
  `video` text NOT NULL,
  `series_id` int DEFAULT NULL,
  `size` int NOT NULL,
  `film_ext` varchar(30) NOT NULL,
  `vid_type` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `film_id` (`film_id`),
  KEY `series_id` (`series_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `uploads`
--

INSERT INTO `uploads` (`id`, `film_id`, `video`, `series_id`, `size`, `film_ext`, `vid_type`, `created_at`) VALUES
(1, 1, 'Avengers.Infinity.War.(NKIRI.COM).2018.BluRay.DOWNLOADED.FROM.NKIRI.COM.mkv', NULL, 556, 'video/x-matroska', '480P', '2025-05-09 16:22:10'),
(2, 2, 'Captain.America.The.Winter.Soldier.2014.REMASTERED.480p.BluRay.HQ.x265.10bit.(9.mkv', NULL, 300, 'video/x-matroska', '480P', '2025-05-09 16:42:11'),
(3, 3, 'Superman_And_Lois_S01E01_-_Pilot_(NetNaija.com).mp4', NULL, 100, 'video/mp4', '720P', '2025-05-09 16:54:00'),
(4, 4, 'Marvel&#039;s Daredevil S01E01 - Into the Ring (Awafim.tv).mkv', 1, 129, 'video/x-matroska', '720P', '2025-05-10 16:11:50'),
(5, 4, 'Marvel&#039;s Daredevil S02E01 - Bang (Awafim.tv).mkv', 2, 121, 'video/x-matroska', '720P', '2025-05-10 16:11:50'),
(6, 6, 'Castlevania.S01E01.@Cartoon_Culture.mkv', 3, 126, 'video/x-matroska', '720P', '2025-05-14 07:55:30'),
(7, 6, 'Castlevania.S01E02.@Cartoon_Culture.mkv', 4, 57, 'video/x-matroska', '720P', '2025-05-14 07:55:31'),
(8, 6, 'Castlevania.S01E03.@Cartoon_Culture.mkv', 5, 54, 'video/x-matroska', '720P', '2025-05-14 07:55:31'),
(9, 6, 'Castlevania.S01E04.@Cartoon_Culture.mkv', 6, 77, 'video/x-matroska', '720P', '2025-05-14 07:55:32'),
(10, 6, 'Castlevania.S02E01.@Cartoon_Culture.mkv', 7, 76, 'video/x-matroska', '720P', '2025-05-14 07:55:32'),
(11, 6, 'Castlevania.S02E02.@Cartoon_Culture.mkv', 8, 66, 'video/x-matroska', '720P', '2025-05-14 07:55:32'),
(12, 6, 'Castlevania.S02E03.@Cartoon_Culture.mkv', 9, 63, 'video/x-matroska', '720P', '2025-05-14 07:55:33'),
(13, 6, 'Castlevania.S02E04.@Cartoon_Culture.mkv', 10, 53, 'video/x-matroska', '720P', '2025-05-14 07:55:33'),
(14, 6, 'Castlevania.S02E05.@Cartoon_Culture.mkv', 11, 50, 'video/x-matroska', '720P', '2025-05-14 07:55:34'),
(15, 6, 'Castlevania.S02E06.@Cartoon_Culture.mkv', 12, 81, 'video/x-matroska', '720P', '2025-05-14 07:55:34'),
(16, 6, 'Castlevania.S02E07.@Cartoon_Culture.mkv', 13, 92, 'video/x-matroska', '720P', '2025-05-14 07:55:34'),
(17, 6, 'Castlevania.S02E08.@Cartoon_Culture.mkv', 14, 63, 'video/x-matroska', '720P', '2025-05-14 07:55:35'),
(18, 9, 'The_Gorge_720P_(2025).mp4', NULL, 476, 'video/x-matroska', '720P', '2025-05-29 00:12:32'),
(19, 10, 'The_Death_of_Superman_720P_(2019).mp4', NULL, 687, 'video/mp4', '720P', '2025-05-29 00:34:49'),
(20, 16, 'The_Idea_of_You_720P_(2024).mp4', NULL, 353, 'video/x-matroska', '720P', '2025-05-29 21:54:55'),
(21, 17, 'Night Agent_S01E01_480P_(2023).mp4', 15, 80, 'video/x-matroska', '480P', '2025-05-29 22:47:03'),
(22, 17, 'Night Agent_S01E02_480P_(2023).mp4', 16, 74, 'video/x-matroska', '480P', '2025-05-29 22:47:04'),
(23, 17, 'Night Agent_S01E03_480P_(2023).mp4', 17, 91, 'video/x-matroska', '480P', '2025-05-29 22:47:04'),
(24, 17, 'Night Agent_S01E04_480P_(2023).mp4', 18, 76, 'video/x-matroska', '480P', '2025-05-29 22:47:05'),
(25, 17, 'Night Agent_S01E05_480P_(2023).mp4', 19, 71, 'video/x-matroska', '480P', '2025-05-29 22:47:05'),
(26, 17, 'Night Agent_S01E06_480P_(2023).mp4', 20, 77, 'video/x-matroska', '480P', '2025-05-29 22:47:05'),
(27, 17, 'Night Agent_S01E07_480P_(2023).mp4', 21, 72, 'video/x-matroska', '480P', '2025-05-29 22:47:05'),
(28, 17, 'Night Agent_S01E08_480P_(2023).mp4', 22, 74, 'video/x-matroska', '480P', '2025-05-29 22:47:05'),
(29, 17, 'Night Agent_S01E09_480P_(2023).mp4', 23, 62, 'video/x-matroska', '480P', '2025-05-29 22:47:06'),
(30, 17, 'Night Agent_S01E10_480P_(2023).mp4', 24, 98, 'video/x-matroska', '480P', '2025-05-29 22:47:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `google_id` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `password` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `google_id` (`google_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `google_id`, `email`, `username`, `is_admin`, `password`, `created_at`, `last_login`) VALUES
(5, NULL, 'ogbukesther@gmail.com', 'Kesther', 0, '$2y$12$Mv.iS2wouanhDngmpPk8F.bj0n38qdOv7lOfhvJrZlA9Xujbba9QO', '2025-04-13 17:19:37', '2025-06-09 07:31:28'),
(7, NULL, 'brianogbu@gmail.com', 'Brian', 0, '$2y$12$bPOhk89gPEbqpitqt6bo/.nKgjGZaUdKfFgcq/v3i5UrU/cqpMZwG', '2025-04-14 16:04:46', '2025-05-31 20:17:22'),
(8, NULL, 'ogbu@gmail.com', 'Ogbu', 1, '$2y$12$31ZnHXDj1.Kx7ZjlajXxJOVkq81D6fhEDiDJ6KztJTsh9msRHx/ui', '2025-04-14 16:13:41', '2025-06-24 21:49:44'),
(13, NULL, 'ogbukest@gmail.com', 'Kesther', 0, '$2y$12$FDIJnjqHxp59O0KTFdmh7ucCjEjs1qw/Csti8o8F/Z0gYp26i/LTO', '2025-05-24 22:12:32', '2025-05-24 22:12:32');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `genres`
--
ALTER TABLE `genres`
  ADD CONSTRAINT `genres_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `films` (`id`);

--
-- Constraints for table `records`
--
ALTER TABLE `records`
  ADD CONSTRAINT `records_ibfk_1` FOREIGN KEY (`user__id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `records_ibfk_2` FOREIGN KEY (`film_id`) REFERENCES `films` (`id`),
  ADD CONSTRAINT `records_ibfk_3` FOREIGN KEY (`upl_id`) REFERENCES `uploads` (`id`);

--
-- Constraints for table `searches`
--
ALTER TABLE `searches`
  ADD CONSTRAINT `searches_ibfk_1` FOREIGN KEY (`user__id`) REFERENCES `users` (`id`);

--
-- Constraints for table `series`
--
ALTER TABLE `series`
  ADD CONSTRAINT `series_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `films` (`id`);

--
-- Constraints for table `uploads`
--
ALTER TABLE `uploads`
  ADD CONSTRAINT `uploads_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `films` (`id`),
  ADD CONSTRAINT `uploads_ibfk_2` FOREIGN KEY (`series_id`) REFERENCES `series` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
