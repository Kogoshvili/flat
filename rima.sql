-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 11, 2020 at 06:24 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rima`
--

-- --------------------------------------------------------

--
-- Table structure for table `lands`
--

CREATE TABLE `lands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `category` text COLLATE utf8mb4_unicode_ci,
  `categoryGe` text COLLATE utf8mb4_unicode_ci,
  `contract` text COLLATE utf8mb4_unicode_ci,
  `contractGe` text COLLATE utf8mb4_unicode_ci,
  `price` double(8,2) DEFAULT NULL,
  `currency` text COLLATE utf8mb4_unicode_ci,
  `textGe` mediumtext COLLATE utf8mb4_unicode_ci,
  `textEn` mediumtext COLLATE utf8mb4_unicode_ci,
  `textRu` mediumtext COLLATE utf8mb4_unicode_ci,
  `city` text COLLATE utf8mb4_unicode_ci,
  `cityGe` text COLLATE utf8mb4_unicode_ci,
  `district` text COLLATE utf8mb4_unicode_ci,
  `districtGe` text COLLATE utf8mb4_unicode_ci,
  `street` text COLLATE utf8mb4_unicode_ci,
  `streetGe` text COLLATE utf8mb4_unicode_ci,
  `address` text COLLATE utf8mb4_unicode_ci,
  `area` double(8,2) DEFAULT NULL,
  `status` text COLLATE utf8mb4_unicode_ci,
  `statusGe` text COLLATE utf8mb4_unicode_ci,
  `images` mediumtext COLLATE utf8mb4_unicode_ci,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `agentID` text COLLATE utf8mb4_unicode_ci,
  `agencyID` text COLLATE utf8mb4_unicode_ci,
  `cadastral` text COLLATE utf8mb4_unicode_ci,
  `owner` text COLLATE utf8mb4_unicode_ci,
  `ownerNum` text COLLATE utf8mb4_unicode_ci,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `active` int(11) NOT NULL,
  `priority` int(11) DEFAULT NULL,
  `verified` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lands`
--

INSERT INTO `lands` (`id`, `created_at`, `updated_at`, `category`, `categoryGe`, `contract`, `contractGe`, `price`, `currency`, `textGe`, `textEn`, `textRu`, `city`, `cityGe`, `district`, `districtGe`, `street`, `streetGe`, `address`, `area`, `status`, `statusGe`, `images`, `lat`, `lng`, `agentID`, `agencyID`, `cadastral`, `owner`, `ownerNum`, `comment`, `active`, `priority`, `verified`) VALUES
(1, '2019-06-24 19:56:26', '2019-06-24 19:56:28', 'land', 'მიწის ნაკვეთი', 'sell', 'იყიდება', 213344.00, NULL, 'asdasd', 'adsadas', 'dasda', 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', 'dddd', 123.00, 'agricultural', 'სასოფლო სამეურნეო', '[\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/lands%2F1%2F2.jpg?alt=media&token=2640204c-da01-4e95-9872-8da7ab6ffe71\",\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/lands%2F1%2F1.jpg?alt=media&token=0e935bfc-3111-4681-9fd5-60805a83e1d3\"]', NULL, NULL, '4oN7TohlBtZjYRkeQpRts5dBsE43', 'RVJQ8xwx2JmeMz3BgFnk', '21334', NULL, NULL, NULL, 1, 1, 1),
(2, '2019-06-24 20:39:59', '2019-06-24 20:40:01', 'land', 'მიწის ნაკვეთი', 'sell', 'იყიდება', 123.00, NULL, 'dsa', NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', '123', 131232.00, 'agricultural', 'სასოფლო სამეურნეო', '[\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/lands%2F2%2F1.jpg?alt=media&token=4e789f36-58b6-41fb-80ed-d95bb74b8fc1\"]', NULL, NULL, '4oN7TohlBtZjYRkeQpRts5dBsE43', 'RVJQ8xwx2JmeMz3BgFnk', '123.123.123.123', NULL, NULL, NULL, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(57, '2014_10_12_000000_create_users_table', 1),
(58, '2014_10_12_100000_create_password_resets_table', 1),
(59, '2019_04_30_021729_create_properties', 1),
(60, '2019_04_30_021738_create_lands', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `category` text COLLATE utf8mb4_unicode_ci,
  `categoryGe` text COLLATE utf8mb4_unicode_ci,
  `contract` text COLLATE utf8mb4_unicode_ci,
  `contractGe` text COLLATE utf8mb4_unicode_ci,
  `price` double(8,2) DEFAULT NULL,
  `currency` text COLLATE utf8mb4_unicode_ci,
  `textGe` mediumtext COLLATE utf8mb4_unicode_ci,
  `textEn` mediumtext COLLATE utf8mb4_unicode_ci,
  `textRu` mediumtext COLLATE utf8mb4_unicode_ci,
  `city` text COLLATE utf8mb4_unicode_ci,
  `cityGe` text COLLATE utf8mb4_unicode_ci,
  `district` text COLLATE utf8mb4_unicode_ci,
  `districtGe` text COLLATE utf8mb4_unicode_ci,
  `street` text COLLATE utf8mb4_unicode_ci,
  `streetGe` text COLLATE utf8mb4_unicode_ci,
  `address` text COLLATE utf8mb4_unicode_ci,
  `area` double(8,2) DEFAULT NULL,
  `yard` double(8,2) DEFAULT NULL,
  `status` text COLLATE utf8mb4_unicode_ci,
  `statusGe` text COLLATE utf8mb4_unicode_ci,
  `quality` text COLLATE utf8mb4_unicode_ci,
  `qualityGe` text COLLATE utf8mb4_unicode_ci,
  `rooms` int(11) DEFAULT NULL,
  `bedrooms` int(11) DEFAULT NULL,
  `bathrooms` int(11) DEFAULT NULL,
  `floor` int(11) DEFAULT NULL,
  `floors` int(11) DEFAULT NULL,
  `balcony` double(8,2) DEFAULT NULL,
  `veranda` double(8,2) DEFAULT NULL,
  `loggia` double(8,2) DEFAULT NULL,
  `ceiling` double(8,2) DEFAULT NULL,
  `parking` text COLLATE utf8mb4_unicode_ci,
  `parkingGe` text COLLATE utf8mb4_unicode_ci,
  `heating` text COLLATE utf8mb4_unicode_ci,
  `heatingGe` text COLLATE utf8mb4_unicode_ci,
  `hotWater` text COLLATE utf8mb4_unicode_ci,
  `hotWaterGe` text COLLATE utf8mb4_unicode_ci,
  `storeroom` text COLLATE utf8mb4_unicode_ci,
  `storeroomGe` text COLLATE utf8mb4_unicode_ci,
  `conditioner` int(11) DEFAULT NULL,
  `telephone` int(11) DEFAULT NULL,
  `furniture` int(11) DEFAULT NULL,
  `elevator` int(11) DEFAULT NULL,
  `internet` int(11) DEFAULT NULL,
  `electonics` int(11) DEFAULT NULL,
  `television` int(11) DEFAULT NULL,
  `fireplace` int(11) DEFAULT NULL,
  `images` mediumtext COLLATE utf8mb4_unicode_ci,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `agentID` text COLLATE utf8mb4_unicode_ci,
  `agencyID` text COLLATE utf8mb4_unicode_ci,
  `cadastral` text COLLATE utf8mb4_unicode_ci,
  `owner` text COLLATE utf8mb4_unicode_ci,
  `ownerNum` text COLLATE utf8mb4_unicode_ci,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `active` int(11) NOT NULL DEFAULT '0',
  `priority` int(11) DEFAULT NULL,
  `verified` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `created_at`, `updated_at`, `category`, `categoryGe`, `contract`, `contractGe`, `price`, `currency`, `textGe`, `textEn`, `textRu`, `city`, `cityGe`, `district`, `districtGe`, `street`, `streetGe`, `address`, `area`, `yard`, `status`, `statusGe`, `quality`, `qualityGe`, `rooms`, `bedrooms`, `bathrooms`, `floor`, `floors`, `balcony`, `veranda`, `loggia`, `ceiling`, `parking`, `parkingGe`, `heating`, `heatingGe`, `hotWater`, `hotWaterGe`, `storeroom`, `storeroomGe`, `conditioner`, `telephone`, `furniture`, `elevator`, `internet`, `electonics`, `television`, `fireplace`, `images`, `lat`, `lng`, `agentID`, `agencyID`, `cadastral`, `owner`, `ownerNum`, `comment`, `active`, `priority`, `verified`) VALUES
(3, '2019-05-09 04:09:57', '2019-05-31 21:04:27', 'apartment', 'ბინა', 'sell', 'იყიდება', 1231.00, NULL, NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', '333', 321.00, NULL, 'new', 'ახალ აშენებული', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '[\".\\/images\\/placeholder.jpg\"]', 41.72004610007557, 44.80935699462884, 'hmJ4OAuJc3QVE2CNkgHCFIHJUJx1', 'RVJQ8xwx2JmeMz3BgFnk', '123.123.123.123', NULL, NULL, NULL, 1, 1, 1),
(4, '2019-05-09 04:14:57', '2019-05-09 07:15:03', 'apartment', 'ბინა', 'sell', 'იყიდება', 123112.00, NULL, NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', '23', 321.00, NULL, 'new', 'ახალ აშენებული', 'new', 'ახალი გარემონტებული', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '[]', 41.72004610007557, 44.80935699462884, 'hmJ4OAuJc3QVE2CNkgHCFIHJUJx1', 'RVJQ8xwx2JmeMz3BgFnk', '123.123.123.123', NULL, NULL, NULL, 1, 1, 1),
(6, '2019-05-09 05:47:43', '2019-05-09 05:47:43', 'apartment', 'ბინა', 'sell', 'იყიდება', 312.00, 'GEL', NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', NULL, 231.00, NULL, 'new', 'ახალ აშენებული', 'new', 'ახალი გარემონტებული', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '[\".\\/images\\/placeholder.jpg\"]', NULL, NULL, 'hmJ4OAuJc3QVE2CNkgHCFIHJUJx1', 'RVJQ8xwx2JmeMz3BgFnk', NULL, NULL, NULL, NULL, 1, 1, 1),
(300001, '2019-05-09 04:15:02', '2019-05-09 04:15:03', 'apartment', 'ბინა', 'sell', 'იყიდება', 123112.00, NULL, NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', '23', 321.00, NULL, 'new', 'ახალ აშენებული', 'new', 'ახალი გარემონტებული', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '[\".\\/images\\/placeholder.jpg\"]', 41.72004610007557, 44.80935699462884, 'hmJ4OAuJc3QVE2CNkgHCFIHJUJx1', 'RVJQ8xwx2JmeMz3BgFnk', '123.123.123.123', NULL, NULL, NULL, 1, 1, 1),
(300002, '2019-05-30 22:06:49', '2019-06-24 19:08:27', 'apartment', 'ბინა', 'sell', 'იყიდება', 302010.00, 'USD', '\r\n							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa ex architecto aperiam qui? Possimus quo, eaque laborum debitis rerum numquam? Minima eveniet quis quia voluptas. Dolorum dolor quia provident ut!', 'magari engl', 'russss', 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', '33', 320.00, NULL, 'new', 'ახალ აშენებული', 'new', 'ახალი გარემონტებული', 2, 3, 1, 5, 10, 10.00, NULL, NULL, 3.00, 'private', 'კორპუსის პარკინგი', 'central', 'ცენტრალური', 'central', 'ცენტრალური', NULL, NULL, 1, 0, 0, 0, 0, 0, 1, 1, '[\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300002%2F2.jpg?alt=media&token=048e648c-7564-4547-bbf0-187186e4b6db\",\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300002%2F5.jpg?alt=media&token=d50131ec-da7e-4e05-8ec6-b9bee35e59a5\",\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300002%2F1.jpg?alt=media&token=1d55f06b-bfbd-4c0e-9f89-d02e99611a13\",\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300002%2F3.jpg?alt=media&token=fe20538e-7ade-4790-824e-763fcdea9ff4\",\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300002%2F4.jpg?alt=media&token=e643ca5d-409d-4c47-bb70-797a2e31ed1b\"]', 41.7179960037374, 44.77296478271478, '4oN7TohlBtZjYRkeQpRts5dBsE43', 'RVJQ8xwx2JmeMz3BgFnk', '12.32.23', NULL, NULL, NULL, 0, 5, 1),
(300003, '2019-05-30 22:07:42', '2019-05-30 22:07:43', 'house', 'სახლი', 'sell', 'იყიდება', 103010.00, 'USD', 'magarit saxliaaa', 'magari engl', 'russss', 'tbilisi', 'თბილისი', 'vake', 'ვაკე', 'tsavtsavadze', 'ჭავჭავაძის გამზ.', '33', 320.00, 300.00, 'old', 'ძველი აშენებული', 'new', 'ახალი გარემონტებული', 2, 3, 1, NULL, 10, 10.00, NULL, NULL, 3.00, 'private', 'კორპუსის პარკინგი', 'central', 'ცენტრალური', 'central', 'ცენტრალური', NULL, NULL, 1, 0, 0, 0, 0, 0, 1, 1, '[\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300003%2F1.jpg?alt=media&token=c035d5d1-7f50-4836-91d1-99d16d7e04a1\",\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300003%2F3.jpg?alt=media&token=d1fc94ee-92a9-4dd1-a400-c812687f45f1\",\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300003%2F2.jpg?alt=media&token=903127ad-85de-492b-87c9-3f2206b78e13\"]', 41.7179960037374, 44.77296478271478, 'hmJ4OAuJc3QVE2CNkgHCFIHJUJx1', 'RVJQ8xwx2JmeMz3BgFnk', '12.32.23', NULL, NULL, NULL, 1, 1, 1),
(300004, '2019-05-30 22:08:21', '2019-06-01 19:15:46', 'commercial', 'კომერციული ფართი', 'sell', 'იყიდება', 104500.00, 'GEL', 'magarit saxliaaa', 'magari engl', 'russss', 'tbilisi', 'თბილისი', 'vake', 'ვაკე', 'tsavtsavadze', 'ჭავჭავაძის გამზ.', '320', 320.00, 300.00, 'old', 'ძველი აშენებული', 'old', 'ძველი გარემონტებული', 5, 3, 1, NULL, 10, 10.00, 30.00, NULL, 3.00, 'private', 'კორპუსის პარკინგი', 'central', 'ცენტრალური', 'central', 'ცენტრალური', NULL, NULL, 1, 0, 0, 0, 0, 0, 1, 1, '[\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300004%2F1.jpg?alt=media&token=af1d4dc8-ab06-4788-b620-a8630509f75f\",\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300004%2F2.jpg?alt=media&token=c4eb2ce0-d7f9-4625-8439-674c4ad601f0\"]', 41.7179960037374, 44.77296478271478, 'hmJ4OAuJc3QVE2CNkgHCFIHJUJx1', 'RVJQ8xwx2JmeMz3BgFnk', '12.32.23', NULL, NULL, NULL, 1, 5, 1),
(300005, '2019-05-30 22:08:26', '2019-05-30 22:08:28', 'hotel', 'სასტუმრო', 'sell', 'იყიდება', 104500.00, 'GEL', 'magarit saxliaaa', 'magari engl', 'russss', 'tbilisi', 'თბილისი', 'vake', 'ვაკე', 'tsavtsavadze', 'ჭავჭავაძის გამზ.', '320', 320.00, 300.00, 'old', 'ძველი აშენებული', 'old', 'ძველი გარემონტებული', 5, 3, 1, NULL, 10, 10.00, 30.00, NULL, 3.00, 'private', 'კორპუსის პარკინგი', 'central', 'ცენტრალური', 'central', 'ცენტრალური', NULL, NULL, 1, 0, 0, 0, 0, 0, 1, 1, '[\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300005%2F2.jpg?alt=media&token=ede07776-a3d5-4a72-a9fa-f12bce2283ba\",\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300005%2F3.jpg?alt=media&token=e8752d39-f193-401b-9684-e0fcfb1cf57c\",\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300005%2F1.jpg?alt=media&token=906cadd9-04d9-40e5-a473-e2761649c1e9\"]', 41.7179960037374, 44.77296478271478, 'hmJ4OAuJc3QVE2CNkgHCFIHJUJx1', 'RVJQ8xwx2JmeMz3BgFnk', '12.32.23', NULL, NULL, NULL, 1, 1, 1),
(300006, '2019-05-30 22:08:43', '2019-06-01 12:12:04', 'apartment', 'ბინა', 'sell', 'იყიდება', 104500.00, NULL, 'magarit saxliaaa', 'magari engl', 'russss', 'batumi', 'ბათუმი', 'vake', 'ვაკე', 'tsavtsavadze', 'ჭავჭავაძის გამზ.', '320', 320.00, 300.00, 'old', 'ძველი აშენებული', NULL, NULL, 5, 3, 1, NULL, 10, 10.00, 30.00, NULL, 3.00, 'private', 'კორპუსის პარკინგი', 'central', 'ცენტრალური', 'central', 'ცენტრალური', NULL, NULL, 1, 0, 0, 0, 0, 0, 1, 1, '[\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300006%2F1.jpg?alt=media&token=262814e0-6b5e-4b8a-aa6b-abf10db866a7\",\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300006%2F2.jpg?alt=media&token=90042429-6470-4865-a5be-828eae1aa4cf\"]', 41.67236444514297, 45.81347686767572, 'hmJ4OAuJc3QVE2CNkgHCFIHJUJx1', 'RVJQ8xwx2JmeMz3BgFnk', '12.32.23', NULL, NULL, NULL, 1, 5, 1),
(300007, '2019-06-01 23:26:38', '2019-06-01 23:26:38', 'apartment', 'ბინა', 'sell', 'იყიდება', 312123.00, NULL, NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', NULL, 21312.00, NULL, 'new', 'ახალ აშენებული', 'old', 'ძველი გარემონტებული', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '[]', NULL, NULL, 'GnOeBIY0LmNRBW46JRckVKdtJj03', NULL, NULL, NULL, NULL, NULL, 1, 1, 1),
(300008, '2019-06-01 23:30:05', '2019-06-01 23:30:05', 'apartment', 'ბინა', 'sell', 'იყიდება', 546.00, NULL, NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', NULL, 456.00, NULL, 'new', 'ახალ აშენებული', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '[]', NULL, NULL, 'GnOeBIY0LmNRBW46JRckVKdtJj03', NULL, NULL, NULL, NULL, NULL, 1, 1, 1),
(300009, '2019-06-01 23:31:32', '2019-06-01 23:31:32', 'apartment', 'ბინა', 'sell', 'იყიდება', 56.00, NULL, NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', NULL, 566.00, NULL, 'new', 'ახალ აშენებული', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '[]', NULL, NULL, 'GnOeBIY0LmNRBW46JRckVKdtJj03', NULL, NULL, NULL, NULL, NULL, 1, 1, 1),
(300010, '2019-06-01 23:38:11', '2019-06-01 23:38:11', 'apartment', 'ბინა', 'sell', 'იყიდება', 24323.00, NULL, NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', NULL, 23423.00, NULL, 'new', 'ახალ აშენებული', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '[]', NULL, NULL, '34SD3od5kcaH9NKpfSCpIJl9p8B2', NULL, NULL, NULL, NULL, NULL, 1, 1, 1),
(300011, '2019-06-02 00:07:34', '2019-06-08 10:45:42', 'apartment', 'ბინა', 'sell', 'იყიდება', 6445.00, 'GEL', NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', NULL, 435564.00, NULL, 'new', 'ახალ აშენებული', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '[\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300011%2F1.jpg?alt=media&token=e6c0e911-c438-4500-b8eb-ffcc3b373d75\"]', NULL, NULL, '9eAshOLco0UMI4RzJMKuDgYjPUG2', 'RVJQ8xwx2JmeMz3BgFnk', NULL, NULL, NULL, NULL, 1, 5, 1),
(300012, '2019-06-18 09:12:21', '2019-06-18 09:12:21', 'apartment', 'ბინა', 'sell', 'იყიდება', 3213.00, NULL, NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', NULL, 123.00, NULL, 'new', 'ახალ აშენებული', 'new', 'ახალი გარემონტებული', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '\"[]\"', NULL, NULL, 'as5l00Gy7sNS7saw5kuz4zTU6u13', 'RVJQ8xwx2JmeMz3BgFnk', NULL, NULL, NULL, NULL, 1, 1, 1),
(300013, '2019-06-18 09:12:30', '2019-06-18 09:12:30', 'apartment', 'ბინა', 'sell', 'იყიდება', 3213.00, NULL, NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', NULL, 123.00, NULL, 'new', 'ახალ აშენებული', 'new', 'ახალი გარემონტებული', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '[\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300013%2F1.jpg?alt=media&token=ca7ee5e3-0b47-4ac7-9b18-37a5c6ee3e8d\"]', NULL, NULL, 'as5l00Gy7sNS7saw5kuz4zTU6u13', 'RVJQ8xwx2JmeMz3BgFnk', NULL, NULL, NULL, NULL, 1, 1, 1),
(300014, '2019-06-18 09:12:47', '2019-06-18 09:12:48', 'apartment', 'ბინა', 'sell', 'იყიდება', 3213.00, NULL, NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', '321', 123.00, NULL, 'new', 'ახალ აშენებული', 'new', 'ახალი გარემონტებული', 33, 3, 1, 4, 2, 123.00, NULL, NULL, 3.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '[\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300014%2F1.jpg?alt=media&token=bf110e75-d375-4f5d-a4eb-89538b643720\"]', NULL, NULL, 'as5l00Gy7sNS7saw5kuz4zTU6u13', 'RVJQ8xwx2JmeMz3BgFnk', '1231231231', NULL, NULL, NULL, 1, 1, 1),
(300015, '2019-06-18 09:13:05', '2019-06-18 09:13:07', 'apartment', 'ბინა', 'sell', 'იყიდება', 3213.00, NULL, 'dasdasd dw d', NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', '321', 123.00, NULL, 'new', 'ახალ აშენებული', 'new', 'ახალი გარემონტებული', 33, 3, 1, 4, 2, 123.00, NULL, NULL, 3.00, 'garage', 'ავტოფარეხი', 'central', 'ცენტრალური', 'central', 'ცენტრალური', 'loft', 'სხვენი', 0, 0, 1, 1, 0, 0, 0, 1, '[\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300015%2F1.jpg?alt=media&token=2fd1a46d-ddee-45bf-95db-d29e77f33fb6\",\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300015%2F2.jpg?alt=media&token=21b5f053-fda1-4b08-b4a2-8d33346fa04f\"]', NULL, NULL, 'as5l00Gy7sNS7saw5kuz4zTU6u13', 'RVJQ8xwx2JmeMz3BgFnk', '1231231231', NULL, NULL, NULL, 1, 1, 1),
(300016, '2019-06-18 09:13:18', '2019-06-18 09:13:19', 'apartment', 'ბინა', 'sell', 'იყიდება', 300000.00, NULL, 'dasdasd dw d', NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', '321', 123.00, NULL, 'new', 'ახალ აშენებული', 'new', 'ახალი გარემონტებული', 33, 3, 1, 4, 2, 123.00, NULL, NULL, 3.00, 'garage', 'ავტოფარეხი', 'central', 'ცენტრალური', 'central', 'ცენტრალური', 'loft', 'სხვენი', 0, 0, 1, 1, 0, 0, 0, 1, '[\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300016%2F1.jpg?alt=media&token=783ffcb6-d3c8-478c-aab2-ebaf178db86a\",\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300016%2F2.jpg?alt=media&token=b97f6dc1-4e07-4a88-a522-9d7bf7d00d27\",\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300016%2F3.jpg?alt=media&token=c036ddd8-ce66-444c-98a2-b4ec781038f5\"]', NULL, NULL, 'as5l00Gy7sNS7saw5kuz4zTU6u13', 'RVJQ8xwx2JmeMz3BgFnk', '1231231231', NULL, NULL, NULL, 1, 1, 1),
(300017, '2019-06-18 09:13:26', '2019-06-18 09:13:28', 'apartment', 'ბინა', 'sell', 'იყიდება', 300001.00, 'USD', 'dasdasd dw d', NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', '321', 123.00, NULL, 'new', 'ახალ აშენებული', 'new', 'ახალი გარემონტებული', 33, 3, 1, 4, 2, 123.00, NULL, NULL, 3.00, 'garage', 'ავტოფარეხი', 'central', 'ცენტრალური', 'central', 'ცენტრალური', 'loft', 'სხვენი', 0, 0, 1, 1, 0, 0, 0, 1, '[\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300017%2F1.jpg?alt=media&token=caa47a20-856a-45ee-9486-58ff60ea19bc\",\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300017%2F3.jpg?alt=media&token=346eb87d-52a9-4494-8685-fe36170d45aa\",\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/properties%2F300017%2F2.jpg?alt=media&token=9f2fce23-0c7c-4d66-ae8f-5e0397a37b4a\"]', NULL, NULL, 'as5l00Gy7sNS7saw5kuz4zTU6u13', 'RVJQ8xwx2JmeMz3BgFnk', '1231231231', NULL, NULL, NULL, 1, 1, 1),
(300018, '2019-06-25 02:21:09', '2019-06-25 02:21:09', 'apartment', 'ბინა', 'sell', 'იყიდება', 3456.00, NULL, NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', '234', 354.00, NULL, 'new', 'ახალ აშენებული', 'new', 'ახალი გარემონტებული', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '\"[]\"', NULL, NULL, '4oN7TohlBtZjYRkeQpRts5dBsE43', 'RVJQ8xwx2JmeMz3BgFnk', NULL, NULL, NULL, NULL, 1, 1, 1),
(300019, '2019-06-25 02:22:09', '2019-06-25 02:22:09', 'apartment', 'ბინა', 'sell', 'იყიდება', 3546.00, NULL, NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', NULL, 3456.00, NULL, 'new', 'ახალ აშენებული', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '\"[]\"', NULL, NULL, '4oN7TohlBtZjYRkeQpRts5dBsE43', 'RVJQ8xwx2JmeMz3BgFnk', NULL, NULL, NULL, NULL, 1, 1, 1),
(300020, '2019-06-25 02:23:43', '2019-06-25 02:23:43', 'apartment', 'ბინა', 'sell', 'იყიდება', 234.00, NULL, NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', NULL, 234.00, NULL, 'new', 'ახალ აშენებული', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '\"[]\"', NULL, NULL, '4oN7TohlBtZjYRkeQpRts5dBsE43', 'RVJQ8xwx2JmeMz3BgFnk', NULL, NULL, NULL, NULL, 1, 1, 1),
(300021, '2019-06-25 19:05:12', '2019-06-25 19:05:12', 'apartment', 'ბინა', 'sell', 'იყიდება', 1321.00, 'GEL', NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', NULL, 1322.00, NULL, 'old', 'ძველი აშენებული', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '\"[]\"', NULL, NULL, '4oN7TohlBtZjYRkeQpRts5dBsE43', 'RVJQ8xwx2JmeMz3BgFnk', NULL, NULL, NULL, NULL, 1, 1, 1),
(300022, '2019-06-25 19:08:06', '2019-06-25 19:08:06', 'apartment', 'ბინა', 'sell', 'იყიდება', 1231.00, NULL, NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', NULL, 1231.00, NULL, 'new', 'ახალ აშენებული', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '\"[]\"', NULL, NULL, '4oN7TohlBtZjYRkeQpRts5dBsE43', 'RVJQ8xwx2JmeMz3BgFnk', NULL, NULL, NULL, NULL, 1, 1, 1),
(300023, '2019-06-25 19:09:34', '2019-06-25 19:09:34', 'apartment', 'ბინა', 'sell', 'იყიდება', 213.00, NULL, NULL, NULL, NULL, 'tbilisi', 'თბილისი', 'saburtalo', 'საბურთალო', 'pekini ave.', 'პეკინის გამზ.', NULL, 312.00, NULL, 'new', 'ახალ აშენებული', 'new', 'ახალი გარემონტებული', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, '\"[]\"', NULL, NULL, '4oN7TohlBtZjYRkeQpRts5dBsE43', 'RVJQ8xwx2JmeMz3BgFnk', NULL, NULL, NULL, NULL, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lands`
--
ALTER TABLE `lands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lands`
--
ALTER TABLE `lands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=300024;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
