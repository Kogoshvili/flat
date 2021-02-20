-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: eu-cdbr-west-03.cleardb.net    Database: heroku_696aaefcec42d2e
-- ------------------------------------------------------
-- Server version	5.6.47-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lands`
--

DROP TABLE IF EXISTS `lands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lands` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
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
  `verified` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lands`
--

LOCK TABLES `lands` WRITE;
/*!40000 ALTER TABLE `lands` DISABLE KEYS */;
INSERT INTO `lands` VALUES (1,'2019-06-24 19:56:26','2019-06-24 19:56:28','land','მიწის ნაკვეთი','sell','იყიდება',213344.00,NULL,'asdasd','adsadas','dasda','tbilisi','თბილისი','saburtalo','საბურთალო','pekini ave.','პეკინის გამზ.','dddd',123.00,'agricultural','სასოფლო სამეურნეო','[\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/lands%2F1%2F2.jpg?alt=media&token=2640204c-da01-4e95-9872-8da7ab6ffe71\",\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/lands%2F1%2F1.jpg?alt=media&token=0e935bfc-3111-4681-9fd5-60805a83e1d3\"]',NULL,NULL,'4oN7TohlBtZjYRkeQpRts5dBsE43','RVJQ8xwx2JmeMz3BgFnk','21334',NULL,NULL,NULL,1,1,1),(2,'2019-06-24 20:39:59','2019-06-24 20:40:01','land','მიწის ნაკვეთი','sell','იყიდება',123.00,NULL,'dsa',NULL,NULL,'tbilisi','თბილისი','saburtalo','საბურთალო','pekini ave.','პეკინის გამზ.','123',131232.00,'agricultural','სასოფლო სამეურნეო','[\"https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/rima-189f6.appspot.com\\/o\\/lands%2F2%2F1.jpg?alt=media&token=4e789f36-58b6-41fb-80ed-d95bb74b8fc1\"]',NULL,NULL,'4oN7TohlBtZjYRkeQpRts5dBsE43','RVJQ8xwx2JmeMz3BgFnk','123.123.123.123',NULL,NULL,NULL,1,1,1);
/*!40000 ALTER TABLE `lands` ENABLE KEYS */;
UNLOCK TABLES;
