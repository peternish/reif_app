/*
 Navicat Premium Data Transfer

 Source Server         : hf
 Source Server Type    : MySQL
 Source Server Version : 100427 (10.4.27-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : reif

 Target Server Type    : MySQL
 Target Server Version : 100427 (10.4.27-MariaDB)
 File Encoding         : 65001

 Date: 31/05/2024 08:22:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for business_categories
-- ----------------------------
DROP TABLE IF EXISTS `business_categories`;
CREATE TABLE `business_categories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `children` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `business_categories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 142 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of business_categories
-- ----------------------------
INSERT INTO `business_categories` VALUES (80, 8, '[]', 'Wholesaling(HBFC)');
INSERT INTO `business_categories` VALUES (81, 8, '[]', 'Rentals ');
INSERT INTO `business_categories` VALUES (82, 8, '[]', 'Fix & Flips ');
INSERT INTO `business_categories` VALUES (83, 8, '[]', 'Digital Marketing SaaS  ');
INSERT INTO `business_categories` VALUES (84, 8, '[]', 'Personal Brand/Coaching ');
INSERT INTO `business_categories` VALUES (85, 8, '[]', 'InstaComps SaaS');
INSERT INTO `business_categories` VALUES (86, 8, '[]', 'REI Financials SaaS');

-- ----------------------------
-- Table structure for config
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `expense_category_id` int NULL DEFAULT NULL,
  `vendor_category_id` int NULL DEFAULT NULL,
  `description_category_id` int NULL DEFAULT NULL,
  `payment_method_category_id` int NULL DEFAULT NULL,
  `pay_from_account_category_id` int NULL DEFAULT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `business_category_id` int NOT NULL,
  `customer_category_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 259 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of config
-- ----------------------------

-- ----------------------------
-- Table structure for customer_categories
-- ----------------------------
DROP TABLE IF EXISTS `customer_categories`;
CREATE TABLE `customer_categories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `business_category_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 132 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of customer_categories
-- ----------------------------
INSERT INTO `customer_categories` VALUES (2, 8, '80', '4400 Hemingway Dr APT 141, Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (3, 8, '80', '1225 NE 16th St, Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (4, 8, '80', '333219 E 1060, McLoud, OK');
INSERT INTO `customer_categories` VALUES (5, 8, '80', '8432 NW 87th St, Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (6, 8, '80', '2000 Peachtree Ave, Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (7, 8, '80', '806 W Oklahoma Ave, Okeene, OK 73763');
INSERT INTO `customer_categories` VALUES (8, 8, '80', '1738 N Meridian Ave, Oklahoma City OK, 73107');
INSERT INTO `customer_categories` VALUES (9, 8, '80', '4300 Bonaparte Blvd Oklahoma City OK 73110');
INSERT INTO `customer_categories` VALUES (10, 8, '80', '827 W Ridgewood St, Shawnee, OK 74801, USA');
INSERT INTO `customer_categories` VALUES (11, 8, '80', '1816 N Missouri Ave, Oklahoma City, OK 73111, USA');
INSERT INTO `customer_categories` VALUES (12, 8, '80', '2501 Clover Glen Dr Edmond OK 73013');
INSERT INTO `customer_categories` VALUES (13, 8, '80', '208 Sherwood Ct, Moore, OK 73160, USA');
INSERT INTO `customer_categories` VALUES (14, 8, '80', '908 N Grady St Altus, OK 73521');
INSERT INTO `customer_categories` VALUES (15, 8, '80', '1816 N Saint Peter Ave Oklahoma City OK 73141');
INSERT INTO `customer_categories` VALUES (16, 8, '80', '421 E Cleveland Ave, Guthrie, OK 73044, USA');
INSERT INTO `customer_categories` VALUES (17, 8, '80', '613 Ramblin Oaks Dr, Moore, OK 73160, USA');
INSERT INTO `customer_categories` VALUES (18, 8, '80', '3705 NW 27th St, Oklahoma City, OK 73107, USA');
INSERT INTO `customer_categories` VALUES (19, 8, '80', '5229 S Sunnylane Rd, Oklahoma City, OK 73135, USA');
INSERT INTO `customer_categories` VALUES (20, 8, '80', '941 NE 84th St, Oklahoma City, OK 73114, USA');
INSERT INTO `customer_categories` VALUES (21, 8, '80', '6900 Ashby Ter Oklahoma City OK 73149');
INSERT INTO `customer_categories` VALUES (22, 8, '80', '3408 N Rockwell Ave Bethany OK 73008');
INSERT INTO `customer_categories` VALUES (23, 8, '80', '2915 SW 27th St, Oklahoma City, OK 73108, USA');
INSERT INTO `customer_categories` VALUES (24, 8, '80', '4900 Cherry Hill Ln, Oklahoma City, OK 73135, USA');
INSERT INTO `customer_categories` VALUES (25, 8, '80', '2363 N Peebly Rd, Choctaw, OK 73020, USA');
INSERT INTO `customer_categories` VALUES (26, 8, '80', '5918 S Dimple Ave, Oklahoma City, OK 73135, USA');
INSERT INTO `customer_categories` VALUES (27, 8, '80', '401 Greenwood Dr, Yukon, OK 73099, USA');
INSERT INTO `customer_categories` VALUES (28, 8, '80', '1701 NW Ash Ave, Lawton, OK 73507, USA');
INSERT INTO `customer_categories` VALUES (29, 8, '80', '536 N Dorothy Ave, Shawnee, OK 74801');
INSERT INTO `customer_categories` VALUES (30, 8, '80', '1408 Sw J Ave Lawton OK 73501');
INSERT INTO `customer_categories` VALUES (31, 8, '80', '4212 NW 18th St Oklahoma City OK 73107');
INSERT INTO `customer_categories` VALUES (32, 8, '80', '20525 Misty Glen Dr Newalla OK 74857');
INSERT INTO `customer_categories` VALUES (33, 8, '80', '9520 Rhythm Rd Midwest City OK 73130');
INSERT INTO `customer_categories` VALUES (34, 8, '80', '708 E 2nd St, Cushing, OK 74023, USA');
INSERT INTO `customer_categories` VALUES (35, 8, '80', '6065 Sunset Dr, Guymon, OK 73942');
INSERT INTO `customer_categories` VALUES (36, 8, '80', '1417 Myrtle St, Sioux City, IA 51103');
INSERT INTO `customer_categories` VALUES (37, 8, '80', '31441 S 584 Rd Bunch, OK 74931');
INSERT INTO `customer_categories` VALUES (38, 8, '80', '1788 W Hill St, Louisville, KY 40210, USA');
INSERT INTO `customer_categories` VALUES (39, 8, '80', '717 4th St, Alva, OK 73717, USA');
INSERT INTO `customer_categories` VALUES (40, 8, '80', '1846 Forest Edge Dr, Mishawaka, In, 46544-6733, US');
INSERT INTO `customer_categories` VALUES (41, 8, '80', '109 Lisa Ln SE, Smyrna, GA 30082, USA');
INSERT INTO `customer_categories` VALUES (42, 8, '80', '2334 Torrey Hill Dr, Toledo, OH 43606');
INSERT INTO `customer_categories` VALUES (43, 8, '80', '304 Morningside St, New Roads, LA 70760');
INSERT INTO `customer_categories` VALUES (44, 8, '80', '449 Lamson Bedford Ohio 44146');
INSERT INTO `customer_categories` VALUES (45, 8, '80', '1339 W 110th St, Chicago, IL 60643, USA');
INSERT INTO `customer_categories` VALUES (46, 8, '80', '834 E 46th St N, Tulsa, OK 74106, USA');
INSERT INTO `customer_categories` VALUES (47, 8, '80', '2354 S Geyers Church Rd, Middletown, PA 17057, USA');
INSERT INTO `customer_categories` VALUES (48, 8, '80', '2803 E Raintree Dr, Stillwater, OK 74074, USA');
INSERT INTO `customer_categories` VALUES (49, 8, '80', '3216 Crescent Ave, Fort Wayne, IN 46805');
INSERT INTO `customer_categories` VALUES (50, 8, '80', '3852 E 186th St, Cleveland, OH 44122');
INSERT INTO `customer_categories` VALUES (51, 8, '80', 'Scott St & NE 138th St, Oklahoma City, OK 73013, USA');
INSERT INTO `customer_categories` VALUES (52, 8, '80', '10325 Aberdeen Dr, Yukon, OK 73099, USA');
INSERT INTO `customer_categories` VALUES (53, 8, '80', '1413 S Wilson Ave, Mason City, IA 50401');
INSERT INTO `customer_categories` VALUES (54, 8, '80', '3816 NW 28th St, Oklahoma City, OK 73107');
INSERT INTO `customer_categories` VALUES (55, 8, '80', '23427 E Hill Dr Tecumseh, OK 74873');
INSERT INTO `customer_categories` VALUES (56, 8, '80', '2730 13th St, Ashland, KY 41102, USA');
INSERT INTO `customer_categories` VALUES (57, 8, '80', '31236 E 684 Dr, Wagoner, OK 74467, USA');
INSERT INTO `customer_categories` VALUES (58, 8, '80', '435 Mistletoe Ave, Youngstown, OH 44511');
INSERT INTO `customer_categories` VALUES (59, 8, '80', '801 W 9th St, Newkirk, OK 74647, USA');
INSERT INTO `customer_categories` VALUES (60, 8, '80', '1207 21st Ave SW, Cedar Rapids, IA 52404');
INSERT INTO `customer_categories` VALUES (61, 8, '80', '11608 Century Dr, Oklahoma City, OK 73162, USA');
INSERT INTO `customer_categories` VALUES (62, 8, '80', '13525 Roka Cir, Newalla, OK 74857, USA');
INSERT INTO `customer_categories` VALUES (63, 8, '80', '1127 Olive St, Springfield, OH 45503, USA');
INSERT INTO `customer_categories` VALUES (64, 8, '80', '900 Gray Ave, Ponca City, OK 74601');
INSERT INTO `customer_categories` VALUES (65, 8, '80', '2601 Sunrise Ln, Burlington, IA 52601');
INSERT INTO `customer_categories` VALUES (66, 8, '80', '6913 Chrysler St, Indianapolis, IN 46268');
INSERT INTO `customer_categories` VALUES (67, 8, '80', '4613 Royal Oak Dr, Oklahoma City, OK 73135, USA');
INSERT INTO `customer_categories` VALUES (68, 8, '80', '2528 N Trosper Dr, Oklahoma City, OK 73141');
INSERT INTO `customer_categories` VALUES (69, 8, '80', '2528 N Trosper Dr, Oklahoma City, OK 73141');
INSERT INTO `customer_categories` VALUES (70, 8, '80', '2108 NW Bessie Ave Lawton, OK 73505');
INSERT INTO `customer_categories` VALUES (71, 8, '81', '1635 NE 34th St Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (72, 8, '81', '1508 SW 7th St Lawton, OK');
INSERT INTO `customer_categories` VALUES (73, 8, '81', '2900 E 6th St #111 Stillwater, OK');
INSERT INTO `customer_categories` VALUES (74, 8, '81', '2900 E 6th St #119 Stillwater, OK');
INSERT INTO `customer_categories` VALUES (75, 8, '81', '2900 E 6th St #124 Stillwater, OK');
INSERT INTO `customer_categories` VALUES (76, 8, '81', '802 S Hightower Stillwater, OK');
INSERT INTO `customer_categories` VALUES (77, 8, '81', '2827 Raintree Ave Stillwater, OK');
INSERT INTO `customer_categories` VALUES (78, 8, '81', '215 S Washington Ponca City, OK');
INSERT INTO `customer_categories` VALUES (79, 8, '81', '610 W Nagel Ave Enid, OK');
INSERT INTO `customer_categories` VALUES (80, 8, '81', '1401 Hite Blvd Enid, OK');
INSERT INTO `customer_categories` VALUES (81, 8, '81', '7901 S Council Rd #73 Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (82, 8, '81', '2636 Scoter Ln Castle Rock, CO');
INSERT INTO `customer_categories` VALUES (83, 8, '81', '1620 NW 36th St Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (84, 8, '81', '1212 SW 25th Pl Lawton, OK');
INSERT INTO `customer_categories` VALUES (85, 8, '81', '4322 NW Hoover Ave Lawton, OK');
INSERT INTO `customer_categories` VALUES (86, 8, '81', '2440 NW 3rd St Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (87, 8, '81', '834 E 46th St N Tulsa, OK');
INSERT INTO `customer_categories` VALUES (88, 8, '81', '59 E Main St Addyston, OH');
INSERT INTO `customer_categories` VALUES (89, 8, '81', '59 E Main St Addyston, OH');
INSERT INTO `customer_categories` VALUES (90, 8, '81', '800 S 3rd St Kingfisher, OK');
INSERT INTO `customer_categories` VALUES (91, 8, '81', '52 Glenview Ct Decatur, IL');
INSERT INTO `customer_categories` VALUES (92, 8, '81', '6501 N St Clair Ave Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (93, 8, '81', '441 NW 112th St Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (94, 8, '81', '820 SE 17th St Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (95, 8, '81', 'NE 52nd & Anderson Choctaw, OK');
INSERT INTO `customer_categories` VALUES (96, 8, '81', 'NW 99th & N Shartel Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (97, 8, '81', 'NE 33rd & Post Rd Spencer, OK');
INSERT INTO `customer_categories` VALUES (98, 8, '81', '13801 N Eastern Ave, Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (99, 8, '81', '1010 Oakdale Dr Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (100, 8, '81', 'NE 39th St & Anderson Rd Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (101, 8, '81', 'E Memorial & Old Village Cir Edmond, OK');
INSERT INTO `customer_categories` VALUES (102, 8, '81', '616 Briarwood Ln Frederick, OK');
INSERT INTO `customer_categories` VALUES (103, 8, '82', '9908 Rockwell Ter Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (104, 8, '82', '2803 E Raintree Ave Stillwater, OK');
INSERT INTO `customer_categories` VALUES (105, 8, '82', 'Scott St & NE 38th St Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (106, 8, '82', '2528 N Trosper Dr Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (107, 8, '82', '121 Loch Ln Yukon, OK');
INSERT INTO `customer_categories` VALUES (108, 8, '82', '4108 Shadybrook Dr Midwest City, OK');
INSERT INTO `customer_categories` VALUES (109, 8, '82', '5918 S Dimple Ave Oklahoma City, OK');
INSERT INTO `customer_categories` VALUES (110, 8, '82', '1309 S 13th St Chickasha, OK');
INSERT INTO `customer_categories` VALUES (111, 8, '82', '1315 S 19th St Chickasha, OK');
INSERT INTO `customer_categories` VALUES (112, 8, '83', 'SkyHigh Construction');
INSERT INTO `customer_categories` VALUES (113, 8, '83', 'JSD Sanchez Roofing');
INSERT INTO `customer_categories` VALUES (114, 8, '83', 'Foster Development');
INSERT INTO `customer_categories` VALUES (115, 8, '83', 'Blenders Café');
INSERT INTO `customer_categories` VALUES (116, 8, '83', 'BEST of Kansas');
INSERT INTO `customer_categories` VALUES (117, 8, '83', '2 Doors Down');

-- ----------------------------
-- Table structure for description_categories
-- ----------------------------
DROP TABLE IF EXISTS `description_categories`;
CREATE TABLE `description_categories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `business_category_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 58 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of description_categories
-- ----------------------------
INSERT INTO `description_categories` VALUES (3, '80', 8, 'Pics/Video/Lockbox');
INSERT INTO `description_categories` VALUES (4, '80', 8, 'Flat Fee Listing');
INSERT INTO `description_categories` VALUES (5, '80', 8, 'Acq comm');
INSERT INTO `description_categories` VALUES (6, '80', 8, 'Dispo Comm');
INSERT INTO `description_categories` VALUES (7, '80', 8, 'Phone System');
INSERT INTO `description_categories` VALUES (8, '80', 8, 'Monthly Software');
INSERT INTO `description_categories` VALUES (9, '80', 8, 'CRM');
INSERT INTO `description_categories` VALUES (10, '80', 8, 'Google Ads');
INSERT INTO `description_categories` VALUES (11, '80', 8, 'Facebook Ads');
INSERT INTO `description_categories` VALUES (12, '80', 8, 'Domain');
INSERT INTO `description_categories` VALUES (13, '80', 8, 'Website Hosting');
INSERT INTO `description_categories` VALUES (14, '80', 8, 'Clean Out');
INSERT INTO `description_categories` VALUES (15, '81', 8, 'Pics/Video/Lockbox');
INSERT INTO `description_categories` VALUES (16, '81', 8, 'Zillow listing');
INSERT INTO `description_categories` VALUES (17, '81', 8, 'Acq comm');
INSERT INTO `description_categories` VALUES (18, '81', 8, 'Dispo Comm');
INSERT INTO `description_categories` VALUES (19, '81', 8, 'Clean Out');
INSERT INTO `description_categories` VALUES (20, '81', 8, 'Contractor Repairs');
INSERT INTO `description_categories` VALUES (21, '81', 8, 'Gas Bill');
INSERT INTO `description_categories` VALUES (22, '81', 8, 'Electric Bill');
INSERT INTO `description_categories` VALUES (23, '81', 8, 'Water Bill');
INSERT INTO `description_categories` VALUES (24, '81', 8, 'Mowing');
INSERT INTO `description_categories` VALUES (25, '81', 8, 'Property Taxes');
INSERT INTO `description_categories` VALUES (26, '82', 8, 'Pics/Video/Lockbox');
INSERT INTO `description_categories` VALUES (27, '82', 8, 'Zillow listing');
INSERT INTO `description_categories` VALUES (28, '82', 8, 'Acq comm');
INSERT INTO `description_categories` VALUES (29, '82', 8, 'Dispo Comm');
INSERT INTO `description_categories` VALUES (30, '82', 8, 'Dispo Comm');
INSERT INTO `description_categories` VALUES (31, '82', 8, 'Contractor Repairs');
INSERT INTO `description_categories` VALUES (32, '82', 8, 'Gas Bill');
INSERT INTO `description_categories` VALUES (33, '82', 8, 'Electric Bill');
INSERT INTO `description_categories` VALUES (34, '82', 8, 'Water Bill');
INSERT INTO `description_categories` VALUES (35, '82', 8, 'Mowing');
INSERT INTO `description_categories` VALUES (36, '82', 8, 'Property Taxes');
INSERT INTO `description_categories` VALUES (37, '82', 8, 'Realtor fee');
INSERT INTO `description_categories` VALUES (38, '83', 8, 'Website Design');
INSERT INTO `description_categories` VALUES (39, '83', 8, 'Automation');
INSERT INTO `description_categories` VALUES (40, '83', 8, 'Implementation');
INSERT INTO `description_categories` VALUES (41, '83', 8, 'CRM');
INSERT INTO `description_categories` VALUES (42, '83', 8, 'Domain Purchase');
INSERT INTO `description_categories` VALUES (43, '83', 8, 'Domain Renewal');
INSERT INTO `description_categories` VALUES (44, '83', 8, 'A.I. advertising');
INSERT INTO `description_categories` VALUES (45, '84', 8, 'Content Creation');
INSERT INTO `description_categories` VALUES (46, '84', 8, 'Social Media growth');
INSERT INTO `description_categories` VALUES (47, '84', 8, 'CRM');
INSERT INTO `description_categories` VALUES (48, '85', 8, 'Software Development');
INSERT INTO `description_categories` VALUES (49, '85', 8, 'Domain Purchase');
INSERT INTO `description_categories` VALUES (50, '85', 8, 'Website Hosting');
INSERT INTO `description_categories` VALUES (51, '86', 8, 'Software Development');
INSERT INTO `description_categories` VALUES (52, '86', 8, 'Domain Purchase');
INSERT INTO `description_categories` VALUES (54, '86', 8, 'Website Hosting');
INSERT INTO `description_categories` VALUES (56, '0', 1, 'Description_hello_world');

-- ----------------------------
-- Table structure for expense_categories
-- ----------------------------
DROP TABLE IF EXISTS `expense_categories`;
CREATE TABLE `expense_categories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `business_category_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` enum('expense','income') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'expense',
  `children` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 172 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of expense_categories
-- ----------------------------
INSERT INTO `expense_categories` VALUES (78, 8, '80', ' Sales Commissions', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (79, 8, '80', 'Adverting & Marketing', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (80, 8, '80', 'Runner', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (81, 8, '80', 'Phone', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (82, 8, '80', 'Software/Subscriptions', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (83, 8, '80', 'Developer', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (84, 8, '80', 'Travel/Meetings', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (85, 8, '80', 'Education', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (86, 8, '80', 'Office', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (87, 8, '80', 'Company Loans', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (88, 8, '80', 'Wholesale Fee', 'income', '[]');
INSERT INTO `expense_categories` VALUES (89, 8, '80', 'Lien Release', 'income', '[]');
INSERT INTO `expense_categories` VALUES (90, 8, '80', 'Referral Fee', 'income', '[]');
INSERT INTO `expense_categories` VALUES (91, 8, '81', 'Sales Commissions', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (92, 8, '81', 'Insurance', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (93, 8, '81', 'Utilities', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (94, 8, '81', 'Property Taxes', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (95, 8, '81', 'Contractor Repairs', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (96, 8, '81', 'Supplies', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (97, 8, '81', 'Legal & Professional Fees', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (98, 8, '81', 'Cleaning', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (99, 8, '81', 'Mortgage', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (100, 8, '81', 'Lot Rent', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (101, 8, '81', 'Advertising', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (102, 8, '81', 'Security Deposit', 'income', '[]');
INSERT INTO `expense_categories` VALUES (103, 8, '81', 'Rent', 'income', '[]');
INSERT INTO `expense_categories` VALUES (104, 8, '81', 'Late Fees', 'income', '[]');
INSERT INTO `expense_categories` VALUES (105, 8, '81', 'Insurance Refund', 'income', '[]');
INSERT INTO `expense_categories` VALUES (106, 8, '81', 'Utilities Refund', 'income', '[]');
INSERT INTO `expense_categories` VALUES (107, 8, '81', 'Cash Out Refi', 'income', '[]');
INSERT INTO `expense_categories` VALUES (108, 8, '81', 'Down Payment', 'income', '[]');
INSERT INTO `expense_categories` VALUES (109, 8, '82', 'Sales Commissions', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (110, 8, '82', 'Insurance', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (111, 8, '82', 'Utilities', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (112, 8, '82', 'Property Taxes', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (113, 8, '82', 'Contractor Repairs', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (114, 8, '82', 'Supplies', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (115, 8, '82', 'Legal & Professional ', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (116, 8, '82', 'Fees', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (117, 8, '82', 'Cleaning', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (118, 8, '82', 'Mortgage', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (119, 8, '82', 'Lot Rent', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (120, 8, '82', 'Advertising', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (121, 8, '82', 'Property Sale', 'income', '[]');
INSERT INTO `expense_categories` VALUES (122, 8, '82', 'Cash Out From Closing', 'income', '[]');
INSERT INTO `expense_categories` VALUES (123, 8, '82', 'Insurance Refund', 'income', '[]');
INSERT INTO `expense_categories` VALUES (124, 8, '82', 'Utilities Refund', 'income', '[]');
INSERT INTO `expense_categories` VALUES (125, 8, '83', 'Sales Commissions', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (126, 8, '83', 'Fulfillment Commissions', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (127, 8, '83', 'Advertising & Marketing', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (128, 8, '83', 'Office', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (129, 8, '83', 'Developer', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (130, 8, '83', 'Setup Fee', 'income', '[]');
INSERT INTO `expense_categories` VALUES (131, 8, '83', 'Monthly Subscription', 'income', '[]');
INSERT INTO `expense_categories` VALUES (132, 8, '84', 'Sales Commissions', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (133, 8, '84', 'Affiliate Commissions', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (134, 8, '84', 'Advertising & Marketing', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (135, 8, '84', 'Office', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (136, 8, '84', 'YouTube AdSense', 'income', '[]');
INSERT INTO `expense_categories` VALUES (137, 8, '84', 'Merchandise', 'income', '[]');
INSERT INTO `expense_categories` VALUES (138, 8, '84', 'Coaching', 'income', '[]');
INSERT INTO `expense_categories` VALUES (139, 8, '84', 'Digital Course', 'income', '[]');
INSERT INTO `expense_categories` VALUES (140, 8, '84', 'Affiliate Commissions', 'income', '[]');
INSERT INTO `expense_categories` VALUES (141, 8, '85', 'Sales Commissions', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (142, 8, '85', 'Affiliate Commissions', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (143, 8, '85', 'Advertising & Marketing', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (144, 8, '85', 'Office', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (145, 8, '85', 'Developer', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (146, 8, '85', 'Subscriptions', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (147, 8, '85', 'One Time Purchase', 'income', '[]');
INSERT INTO `expense_categories` VALUES (148, 8, '85', 'Monthly Subscription', 'income', '[]');
INSERT INTO `expense_categories` VALUES (149, 8, '86', 'Affiliate Commissions', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (150, 8, '86', 'Advertising & Marketing', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (151, 8, '86', 'Office', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (152, 8, '86', 'Developer', 'expense', '[]');
INSERT INTO `expense_categories` VALUES (153, 8, '86', 'One Time Purchase', 'income', '[]');
INSERT INTO `expense_categories` VALUES (159, 8, '86', 'Monthly Subscription', 'income', '[]');

-- ----------------------------
-- Table structure for expenses
-- ----------------------------
DROP TABLE IF EXISTS `expenses`;
CREATE TABLE `expenses`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL DEFAULT 0,
  `date` date NOT NULL,
  `receipt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `config_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4709 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of expenses
-- ----------------------------

-- ----------------------------
-- Table structure for imported_data
-- ----------------------------
DROP TABLE IF EXISTS `imported_data`;
CREATE TABLE `imported_data`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `original_data` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `extra_data` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `user_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of imported_data
-- ----------------------------

-- ----------------------------
-- Table structure for incomes
-- ----------------------------
DROP TABLE IF EXISTS `incomes`;
CREATE TABLE `incomes`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `amount` double NOT NULL DEFAULT 0,
  `balance` double NULL DEFAULT 0,
  `config_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3324 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of incomes
-- ----------------------------

-- ----------------------------
-- Table structure for pay_from_account_categories
-- ----------------------------
DROP TABLE IF EXISTS `pay_from_account_categories`;
CREATE TABLE `pay_from_account_categories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `business_category_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 86 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pay_from_account_categories
-- ----------------------------
INSERT INTO `pay_from_account_categories` VALUES (4, '80', 8, 'Chase Business');
INSERT INTO `pay_from_account_categories` VALUES (5, '80', 8, 'Chase SW CC G');
INSERT INTO `pay_from_account_categories` VALUES (6, '80', 8, 'Chase SW CC Mo');
INSERT INTO `pay_from_account_categories` VALUES (7, '80', 8, 'Chase CC 5641');
INSERT INTO `pay_from_account_categories` VALUES (8, '80', 8, 'Chase CC 3794');
INSERT INTO `pay_from_account_categories` VALUES (9, '80', 8, 'Discover CC');
INSERT INTO `pay_from_account_categories` VALUES (10, '80', 8, 'Citi CC');
INSERT INTO `pay_from_account_categories` VALUES (11, '80', 8, 'Bank of America CC');
INSERT INTO `pay_from_account_categories` VALUES (12, '80', 8, 'US Bank CC');
INSERT INTO `pay_from_account_categories` VALUES (13, '80', 8, 'Lowes CC');
INSERT INTO `pay_from_account_categories` VALUES (14, '80', 8, 'Home Depot CC');
INSERT INTO `pay_from_account_categories` VALUES (15, '81', 8, 'Chase Business');
INSERT INTO `pay_from_account_categories` VALUES (16, '81', 8, 'Chase SW CC G');
INSERT INTO `pay_from_account_categories` VALUES (17, '81', 8, 'Chase SW CC Mo');
INSERT INTO `pay_from_account_categories` VALUES (18, '81', 8, 'Chase CC 5641');
INSERT INTO `pay_from_account_categories` VALUES (19, '81', 8, 'Chase CC 3794');
INSERT INTO `pay_from_account_categories` VALUES (20, '81', 8, 'Discover CC');
INSERT INTO `pay_from_account_categories` VALUES (21, '81', 8, 'Citi CC');
INSERT INTO `pay_from_account_categories` VALUES (22, '81', 8, 'Bank of America CC');
INSERT INTO `pay_from_account_categories` VALUES (23, '81', 8, 'US Bank CC');
INSERT INTO `pay_from_account_categories` VALUES (24, '81', 8, 'Lowes CC');
INSERT INTO `pay_from_account_categories` VALUES (25, '81', 8, 'Home Depot CC');
INSERT INTO `pay_from_account_categories` VALUES (27, '82', 8, 'Chase Business');
INSERT INTO `pay_from_account_categories` VALUES (28, '82', 8, 'Chase SW CC G');
INSERT INTO `pay_from_account_categories` VALUES (29, '82', 8, 'Chase SW CC Mo');
INSERT INTO `pay_from_account_categories` VALUES (30, '82', 8, 'Chase CC 5641');
INSERT INTO `pay_from_account_categories` VALUES (31, '82', 8, 'Chase CC 3794');
INSERT INTO `pay_from_account_categories` VALUES (32, '82', 8, 'Discover CC');
INSERT INTO `pay_from_account_categories` VALUES (33, '82', 8, 'Citi CC');
INSERT INTO `pay_from_account_categories` VALUES (34, '82', 8, 'Bank of America CC');
INSERT INTO `pay_from_account_categories` VALUES (35, '82', 8, 'US Bank CC');
INSERT INTO `pay_from_account_categories` VALUES (36, '82', 8, 'Lowes CC');
INSERT INTO `pay_from_account_categories` VALUES (37, '82', 8, 'Home Depot CC');
INSERT INTO `pay_from_account_categories` VALUES (38, '83', 8, 'Chase Business');
INSERT INTO `pay_from_account_categories` VALUES (39, '83', 8, 'Chase SW CC G');
INSERT INTO `pay_from_account_categories` VALUES (40, '83', 8, 'Chase SW CC Mo');
INSERT INTO `pay_from_account_categories` VALUES (41, '83', 8, 'Chase CC 5641');
INSERT INTO `pay_from_account_categories` VALUES (42, '83', 8, 'Chase CC 3794');
INSERT INTO `pay_from_account_categories` VALUES (43, '83', 8, 'Discover CC');
INSERT INTO `pay_from_account_categories` VALUES (44, '83', 8, 'Citi CC');
INSERT INTO `pay_from_account_categories` VALUES (45, '83', 8, 'Bank of America CC');
INSERT INTO `pay_from_account_categories` VALUES (46, '83', 8, 'US Bank CC');
INSERT INTO `pay_from_account_categories` VALUES (47, '83', 8, 'Lowes CC');
INSERT INTO `pay_from_account_categories` VALUES (48, '83', 8, 'Home Depot CC');
INSERT INTO `pay_from_account_categories` VALUES (49, '84', 8, 'Chase Business');
INSERT INTO `pay_from_account_categories` VALUES (50, '84', 8, 'Chase SW CC G');
INSERT INTO `pay_from_account_categories` VALUES (51, '84', 8, 'Chase SW CC Mo');
INSERT INTO `pay_from_account_categories` VALUES (52, '84', 8, 'Chase CC 5641');
INSERT INTO `pay_from_account_categories` VALUES (53, '84', 8, 'Chase CC 3794');
INSERT INTO `pay_from_account_categories` VALUES (54, '84', 8, 'Discover CC');
INSERT INTO `pay_from_account_categories` VALUES (55, '84', 8, 'Citi CC');
INSERT INTO `pay_from_account_categories` VALUES (56, '84', 8, 'Bank of America CC');
INSERT INTO `pay_from_account_categories` VALUES (57, '84', 8, 'US Bank CC');
INSERT INTO `pay_from_account_categories` VALUES (58, '84', 8, 'Lowes CC');
INSERT INTO `pay_from_account_categories` VALUES (59, '84', 8, 'Home Depot CC');
INSERT INTO `pay_from_account_categories` VALUES (60, '85', 8, 'Chase Business');
INSERT INTO `pay_from_account_categories` VALUES (61, '85', 8, 'Chase SW CC G');
INSERT INTO `pay_from_account_categories` VALUES (62, '85', 8, 'Chase SW CC Mo');
INSERT INTO `pay_from_account_categories` VALUES (63, '85', 8, 'Chase CC 5641');
INSERT INTO `pay_from_account_categories` VALUES (64, '85', 8, 'Chase CC 3794');
INSERT INTO `pay_from_account_categories` VALUES (65, '85', 8, 'Discover CC');
INSERT INTO `pay_from_account_categories` VALUES (66, '85', 8, 'Citi CC');
INSERT INTO `pay_from_account_categories` VALUES (67, '85', 8, 'Bank of America CC');
INSERT INTO `pay_from_account_categories` VALUES (68, '85', 8, 'US Bank CC');
INSERT INTO `pay_from_account_categories` VALUES (69, '85', 8, 'Lowes CC');
INSERT INTO `pay_from_account_categories` VALUES (70, '85', 8, 'Home Depot CC');
INSERT INTO `pay_from_account_categories` VALUES (71, '86', 8, 'Chase Business');
INSERT INTO `pay_from_account_categories` VALUES (72, '86', 8, 'Chase SW CC G');
INSERT INTO `pay_from_account_categories` VALUES (73, '86', 8, 'Chase SW CC Mo');
INSERT INTO `pay_from_account_categories` VALUES (74, '86', 8, 'Chase CC 5641');
INSERT INTO `pay_from_account_categories` VALUES (75, '86', 8, 'Chase CC 3794');
INSERT INTO `pay_from_account_categories` VALUES (76, '86', 8, 'Discover CC');
INSERT INTO `pay_from_account_categories` VALUES (77, '86', 8, 'Citi CC');
INSERT INTO `pay_from_account_categories` VALUES (78, '86', 8, 'Bank of America CC');
INSERT INTO `pay_from_account_categories` VALUES (79, '86', 8, 'US Bank CC');
INSERT INTO `pay_from_account_categories` VALUES (80, '86', 8, 'Lowes CC');
INSERT INTO `pay_from_account_categories` VALUES (81, '86', 8, 'Home Depot CC');
INSERT INTO `pay_from_account_categories` VALUES (84, '0', 1, 'PayFrom_Timon');

-- ----------------------------
-- Table structure for payment_method_categories
-- ----------------------------
DROP TABLE IF EXISTS `payment_method_categories`;
CREATE TABLE `payment_method_categories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `business_category_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 91 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of payment_method_categories
-- ----------------------------
INSERT INTO `payment_method_categories` VALUES (4, '80', 8, 'Venmo');
INSERT INTO `payment_method_categories` VALUES (5, '80', 8, 'PayPal');
INSERT INTO `payment_method_categories` VALUES (6, '80', 8, 'CashApp');
INSERT INTO `payment_method_categories` VALUES (7, '80', 8, 'Check');
INSERT INTO `payment_method_categories` VALUES (8, '80', 8, 'ACH');
INSERT INTO `payment_method_categories` VALUES (9, '80', 8, 'Auto Draft');
INSERT INTO `payment_method_categories` VALUES (10, '80', 8, 'Credit Card');
INSERT INTO `payment_method_categories` VALUES (11, '80', 8, 'VRBO');
INSERT INTO `payment_method_categories` VALUES (12, '80', 8, 'Airbnb');
INSERT INTO `payment_method_categories` VALUES (13, '80', 8, 'Apartments.com');
INSERT INTO `payment_method_categories` VALUES (14, '81', 8, 'Zelle');
INSERT INTO `payment_method_categories` VALUES (15, '81', 8, 'Venmo');
INSERT INTO `payment_method_categories` VALUES (16, '81', 8, 'PayPal');
INSERT INTO `payment_method_categories` VALUES (17, '81', 8, 'CashApp');
INSERT INTO `payment_method_categories` VALUES (18, '81', 8, 'Check');
INSERT INTO `payment_method_categories` VALUES (19, '81', 8, 'ACH');
INSERT INTO `payment_method_categories` VALUES (20, '81', 8, 'Auto Draft');
INSERT INTO `payment_method_categories` VALUES (21, '81', 8, 'Credit Card');
INSERT INTO `payment_method_categories` VALUES (22, '81', 8, 'VRBO');
INSERT INTO `payment_method_categories` VALUES (23, '81', 8, 'Airbnb');
INSERT INTO `payment_method_categories` VALUES (24, '81', 8, 'Apartments.com');
INSERT INTO `payment_method_categories` VALUES (25, '82', 8, 'Zelle');
INSERT INTO `payment_method_categories` VALUES (26, '82', 8, 'Venmo');
INSERT INTO `payment_method_categories` VALUES (27, '82', 8, 'PayPal');
INSERT INTO `payment_method_categories` VALUES (28, '82', 8, 'CashApp');
INSERT INTO `payment_method_categories` VALUES (29, '82', 8, 'CashApp');
INSERT INTO `payment_method_categories` VALUES (30, '82', 8, 'ACH');
INSERT INTO `payment_method_categories` VALUES (31, '82', 8, 'Auto Draft');
INSERT INTO `payment_method_categories` VALUES (32, '82', 8, 'Credit Card');
INSERT INTO `payment_method_categories` VALUES (33, '82', 8, 'VRBO');
INSERT INTO `payment_method_categories` VALUES (34, '82', 8, 'Airbnb');
INSERT INTO `payment_method_categories` VALUES (35, '82', 8, 'Apartments.com');
INSERT INTO `payment_method_categories` VALUES (36, '83', 8, 'Zelle');
INSERT INTO `payment_method_categories` VALUES (37, '83', 8, 'Venmo');
INSERT INTO `payment_method_categories` VALUES (38, '83', 8, 'PayPal');
INSERT INTO `payment_method_categories` VALUES (39, '83', 8, 'CashApp');
INSERT INTO `payment_method_categories` VALUES (40, '83', 8, 'Check');
INSERT INTO `payment_method_categories` VALUES (41, '83', 8, 'ACH');
INSERT INTO `payment_method_categories` VALUES (42, '83', 8, 'Auto Draft');
INSERT INTO `payment_method_categories` VALUES (43, '83', 8, 'Credit Card');
INSERT INTO `payment_method_categories` VALUES (44, '83', 8, 'VRBO');
INSERT INTO `payment_method_categories` VALUES (45, '83', 8, 'Airbnb');
INSERT INTO `payment_method_categories` VALUES (46, '83', 8, 'Apartments.com');
INSERT INTO `payment_method_categories` VALUES (47, '83', 8, 'Stripe');
INSERT INTO `payment_method_categories` VALUES (48, '84', 8, 'Zelle');
INSERT INTO `payment_method_categories` VALUES (49, '84', 8, 'Venmo');
INSERT INTO `payment_method_categories` VALUES (50, '84', 8, 'PayPal');
INSERT INTO `payment_method_categories` VALUES (51, '84', 8, 'CashApp');
INSERT INTO `payment_method_categories` VALUES (52, '84', 8, 'Check');
INSERT INTO `payment_method_categories` VALUES (53, '84', 8, 'ACH');
INSERT INTO `payment_method_categories` VALUES (54, '84', 8, 'Auto Draft');
INSERT INTO `payment_method_categories` VALUES (55, '84', 8, 'Credit Card');
INSERT INTO `payment_method_categories` VALUES (56, '84', 8, 'VRBO');
INSERT INTO `payment_method_categories` VALUES (57, '84', 8, 'Airbnb');
INSERT INTO `payment_method_categories` VALUES (58, '84', 8, 'Apartments.com');
INSERT INTO `payment_method_categories` VALUES (59, '84', 8, 'Stripe');
INSERT INTO `payment_method_categories` VALUES (60, '85', 8, 'Zelle');
INSERT INTO `payment_method_categories` VALUES (61, '85', 8, 'Venmo');
INSERT INTO `payment_method_categories` VALUES (62, '85', 8, 'PayPal');
INSERT INTO `payment_method_categories` VALUES (63, '85', 8, 'CashApp');
INSERT INTO `payment_method_categories` VALUES (64, '85', 8, 'Check');
INSERT INTO `payment_method_categories` VALUES (65, '85', 8, 'ACH');
INSERT INTO `payment_method_categories` VALUES (66, '85', 8, 'Auto Draft');
INSERT INTO `payment_method_categories` VALUES (67, '85', 8, 'Credit Card');
INSERT INTO `payment_method_categories` VALUES (68, '85', 8, 'VRBO');
INSERT INTO `payment_method_categories` VALUES (69, '85', 8, 'Airbnb');
INSERT INTO `payment_method_categories` VALUES (70, '85', 8, 'Apartments.com');
INSERT INTO `payment_method_categories` VALUES (71, '85', 8, 'Stripe');
INSERT INTO `payment_method_categories` VALUES (72, '86', 8, 'Zelle');
INSERT INTO `payment_method_categories` VALUES (73, '86', 8, 'Venmo');
INSERT INTO `payment_method_categories` VALUES (74, '86', 8, 'Venmo');
INSERT INTO `payment_method_categories` VALUES (75, '86', 8, 'CashApp');
INSERT INTO `payment_method_categories` VALUES (76, '86', 8, 'Check');
INSERT INTO `payment_method_categories` VALUES (77, '86', 8, 'ACH');
INSERT INTO `payment_method_categories` VALUES (78, '86', 8, 'Auto Draft');
INSERT INTO `payment_method_categories` VALUES (79, '86', 8, 'Credit Card');
INSERT INTO `payment_method_categories` VALUES (80, '86', 8, 'VRBO');
INSERT INTO `payment_method_categories` VALUES (81, '86', 8, 'Airbnb');
INSERT INTO `payment_method_categories` VALUES (82, '86', 8, 'Apartments.com');
INSERT INTO `payment_method_categories` VALUES (83, '86', 8, 'Stripe');
INSERT INTO `payment_method_categories` VALUES (84, '80', 8, 'Zelle');
INSERT INTO `payment_method_categories` VALUES (88, '0', 1, 'Paymentmethod_paypal');

-- ----------------------------
-- Table structure for setting
-- ----------------------------
DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `category_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `origin_value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of setting
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password_hash` char(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `signup_date` datetime NOT NULL,
  `last_login` datetime NULL DEFAULT NULL,
  `account_status` enum('active','suspended','deleted') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'active',
  `user_role` enum('premium_user_1','premium_user_2','premium_user_3','free_user') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'free_user',
  `subscription_start_date` date NULL DEFAULT NULL,
  `subscription_end_date` date NULL DEFAULT NULL,
  `profile_picture_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `timezone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `company_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `employee_number` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'peter95613@gmail.com', '$2b$10$adeVzEnS4bf63FHXYla8BO3ywdf3x0ZywjmMT2EyPOP6gmbkLc10e', 'Peter P', '0000-00-00 00:00:00', '2024-05-29 00:00:00', 'active', 'free_user', NULL, NULL, NULL, NULL, NULL, 'Peter', 11);
INSERT INTO `users` VALUES (2, 'peter95613@gmail.co', '$2b$10$ODQm7ltCK2DMOASqXbnqTO3oKwMqK2vauY9gZ637lohwsqKypoHIm', 'Peter P', '2024-02-23 00:00:00', '2024-02-23 00:00:00', 'active', 'free_user', NULL, NULL, NULL, NULL, NULL, 'Peter', 2);
INSERT INTO `users` VALUES (3, 'peter95613@gmail.c', '$2b$10$X4ozphEPUbOcaXP8AfdYFeOUcZGBLS0xV/hTlPps8ajcjCCTqkOsW', 'Peter P', '2024-02-23 00:00:00', '2024-02-23 00:00:00', 'active', 'free_user', NULL, NULL, NULL, NULL, '324564366346346', 'Peter', 6);
INSERT INTO `users` VALUES (4, 'info@reifinancials.com', '$2b$10$ESEIn.0wkxY.ewuGugN0reLJSC7EEdp9ITgeLQlpAh9d7TFPgrW36', 'Peter P', '2024-02-23 00:00:00', '2024-02-23 00:00:00', 'active', 'free_user', NULL, NULL, NULL, NULL, '1', 'Peter', 6);
INSERT INTO `users` VALUES (5, 'peter95613@gmail.coms', '$2b$10$uzfmfkClWRg/bQMaR0zXeuVHclpmrsSGYS3onL33aOpyQ5gNi699m', 'Peter P', '2024-02-23 00:00:00', '2024-02-23 00:00:00', 'active', 'free_user', NULL, NULL, NULL, NULL, '1', 'Peter', 6);
INSERT INTO `users` VALUES (6, 'peter95613@gmail.comsq', '$2b$10$8AGi4oPyt9hBjiOqdxjuXuOJX.WOnyxSmuRatui2MqfTCVgwqeInS', 'Peter P', '2024-02-23 00:00:00', '2024-02-23 00:00:00', 'active', 'free_user', NULL, NULL, NULL, NULL, '1', 'Peter', 6);
INSERT INTO `users` VALUES (7, 'alexcoolman@gmail.com', '$2b$10$yS0/diMCvNu5BnvjheyEIuHhknlr8E7RYFDlutMyf2D1xVTDMzZBO', 'Peter P', '2024-02-26 00:00:00', '2024-02-26 00:00:00', 'active', 'free_user', NULL, NULL, NULL, NULL, '112321', 'Peter', 11);
INSERT INTO `users` VALUES (8, 'info@reifinancials.io', '$2b$10$adeVzEnS4bf63FHXYla8BO3ywdf3x0ZywjmMT2EyPOP6gmbkLc10e', 'Peter P', '2024-02-26 00:00:00', '2024-05-30 00:00:00', 'active', 'free_user', NULL, NULL, NULL, NULL, '1 234 567 1234', 'Peter', 6);
INSERT INTO `users` VALUES (9, 'info@reifinancials.info', '$2b$10$U9d.QxWaTai9ygaH8r3wseI5S/rjAJYsVhg6.Qt8fG3oYy7hnWoAe', 'Peter P', '2024-02-26 00:00:00', '2024-05-01 00:00:00', 'active', 'free_user', NULL, NULL, NULL, NULL, '1 234 567 1234', 'Peter', 21);
INSERT INTO `users` VALUES (10, 'info1@reifinancials.io', '$2b$10$D45cj.fCoJfuODEgalhJjep5gEyRYRL6gTp4f65msBuTA38EAEXJa', '123', '2024-03-15 00:00:00', '2024-03-15 00:00:00', 'active', 'free_user', NULL, NULL, NULL, NULL, '123123123', '123', 2);

-- ----------------------------
-- Table structure for vendor_categories
-- ----------------------------
DROP TABLE IF EXISTS `vendor_categories`;
CREATE TABLE `vendor_categories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `business_category_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 120 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of vendor_categories
-- ----------------------------
INSERT INTO `vendor_categories` VALUES (4, '80', 8, 'Graylan Stewart');
INSERT INTO `vendor_categories` VALUES (5, '80', 8, 'Kim Smith');
INSERT INTO `vendor_categories` VALUES (6, '80', 8, 'Ashley Seay');
INSERT INTO `vendor_categories` VALUES (7, '80', 8, 'Sergio Manzo');
INSERT INTO `vendor_categories` VALUES (8, '80', 8, 'Timothy Harvin');
INSERT INTO `vendor_categories` VALUES (9, '80', 8, 'Ron Sharp');
INSERT INTO `vendor_categories` VALUES (10, '80', 8, 'Ashley Ziegelhofer');
INSERT INTO `vendor_categories` VALUES (11, '80', 8, 'Chelsea Pennick');
INSERT INTO `vendor_categories` VALUES (12, '80', 8, 'Stockton King');
INSERT INTO `vendor_categories` VALUES (13, '80', 8, 'Shayan Mayelzadeh');
INSERT INTO `vendor_categories` VALUES (14, '80', 8, 'Jacob Wascom');
INSERT INTO `vendor_categories` VALUES (15, '80', 8, 'Obedia Ramsey');
INSERT INTO `vendor_categories` VALUES (16, '80', 8, 'Ravi Singh');
INSERT INTO `vendor_categories` VALUES (17, '80', 8, 'Brokerless, Inc');
INSERT INTO `vendor_categories` VALUES (18, '80', 8, 'Ellen Wyssling');
INSERT INTO `vendor_categories` VALUES (19, '80', 8, 'Remitly');
INSERT INTO `vendor_categories` VALUES (20, '80', 8, 'Verizon Wireless');
INSERT INTO `vendor_categories` VALUES (21, '80', 8, 'SBA Loan');
INSERT INTO `vendor_categories` VALUES (22, '80', 8, 'Bankers Healthcare Loan');
INSERT INTO `vendor_categories` VALUES (23, '80', 8, 'Podio');
INSERT INTO `vendor_categories` VALUES (24, '80', 8, 'SmrtPhone');
INSERT INTO `vendor_categories` VALUES (25, '80', 8, 'InvestorLift');
INSERT INTO `vendor_categories` VALUES (26, '80', 8, 'Propstream');
INSERT INTO `vendor_categories` VALUES (27, '80', 8, 'CallRail');
INSERT INTO `vendor_categories` VALUES (29, '80', 8, 'REI Chat');
INSERT INTO `vendor_categories` VALUES (30, '80', 8, 'Closebot');
INSERT INTO `vendor_categories` VALUES (31, '80', 8, 'David Olds');
INSERT INTO `vendor_categories` VALUES (32, '80', 8, 'Google');
INSERT INTO `vendor_categories` VALUES (33, '80', 8, 'Facebook');
INSERT INTO `vendor_categories` VALUES (34, '80', 8, 'Deal Bot Negotiator');
INSERT INTO `vendor_categories` VALUES (35, '81', 8, 'Graylan Stewart');
INSERT INTO `vendor_categories` VALUES (37, '81', 8, 'Kim Smith');
INSERT INTO `vendor_categories` VALUES (38, '81', 8, 'Ashley Seay');
INSERT INTO `vendor_categories` VALUES (39, '81', 8, 'Sergio Manzo');
INSERT INTO `vendor_categories` VALUES (41, '81', 8, 'Timothy Harvin');
INSERT INTO `vendor_categories` VALUES (42, '81', 8, 'Ron Sharp');
INSERT INTO `vendor_categories` VALUES (43, '81', 8, 'Ashley Ziegelhofer');
INSERT INTO `vendor_categories` VALUES (44, '81', 8, 'Chelsea Pennick');
INSERT INTO `vendor_categories` VALUES (45, '81', 8, 'Stockton King');
INSERT INTO `vendor_categories` VALUES (46, '81', 8, 'Shayan Mayelzadeh');
INSERT INTO `vendor_categories` VALUES (47, '81', 8, 'Edward Cabrera');
INSERT INTO `vendor_categories` VALUES (48, '81', 8, 'Couples Cleaning');
INSERT INTO `vendor_categories` VALUES (49, '81', 8, 'Jesus Zepeda');
INSERT INTO `vendor_categories` VALUES (50, '81', 8, 'OG&E');
INSERT INTO `vendor_categories` VALUES (51, '81', 8, 'ONG');
INSERT INTO `vendor_categories` VALUES (52, '81', 8, 'Black Hills Energy');
INSERT INTO `vendor_categories` VALUES (53, '81', 8, 'Intermountain');
INSERT INTO `vendor_categories` VALUES (54, '81', 8, 'Foremost');
INSERT INTO `vendor_categories` VALUES (55, '81', 8, 'Farmers');
INSERT INTO `vendor_categories` VALUES (56, '81', 8, 'Comcast');
INSERT INTO `vendor_categories` VALUES (57, '81', 8, 'City of OKC');
INSERT INTO `vendor_categories` VALUES (58, '81', 8, 'All America Bank');
INSERT INTO `vendor_categories` VALUES (59, '81', 8, 'McClain Bank');
INSERT INTO `vendor_categories` VALUES (60, '81', 8, 'Planet Home');
INSERT INTO `vendor_categories` VALUES (61, '81', 8, 'Lowes');
INSERT INTO `vendor_categories` VALUES (62, '81', 8, 'Home Depot');
INSERT INTO `vendor_categories` VALUES (63, '81', 8, 'Eastern Villa MHP');
INSERT INTO `vendor_categories` VALUES (64, '81', 8, 'Crestview MHC');
INSERT INTO `vendor_categories` VALUES (65, '81', 8, 'Westmoor');
INSERT INTO `vendor_categories` VALUES (66, '81', 8, 'Freedom mortgage');
INSERT INTO `vendor_categories` VALUES (67, '81', 8, 'American Modern');
INSERT INTO `vendor_categories` VALUES (68, '81', 8, 'Apartments.com');
INSERT INTO `vendor_categories` VALUES (69, '81', 8, 'Venmo');
INSERT INTO `vendor_categories` VALUES (70, '81', 8, 'CashApp');
INSERT INTO `vendor_categories` VALUES (71, '81', 8, 'PayPal');
INSERT INTO `vendor_categories` VALUES (72, '81', 8, 'Zillow');
INSERT INTO `vendor_categories` VALUES (73, '82', 8, 'Graylan Stewart');
INSERT INTO `vendor_categories` VALUES (74, '82', 8, 'Salt Real Estate');
INSERT INTO `vendor_categories` VALUES (75, '82', 8, 'Kim Smith');
INSERT INTO `vendor_categories` VALUES (76, '82', 8, 'Edward Cabrera');
INSERT INTO `vendor_categories` VALUES (77, '82', 8, 'Hector Vazquez');
INSERT INTO `vendor_categories` VALUES (78, '82', 8, 'Clendon Cannon');
INSERT INTO `vendor_categories` VALUES (79, '82', 8, 'OG&E');
INSERT INTO `vendor_categories` VALUES (80, '82', 8, 'ONG');
INSERT INTO `vendor_categories` VALUES (81, '82', 8, 'M&T Bank');
INSERT INTO `vendor_categories` VALUES (82, '82', 8, 'City of OKC');
INSERT INTO `vendor_categories` VALUES (83, '82', 8, 'Lowes');
INSERT INTO `vendor_categories` VALUES (84, '82', 8, 'Home Depot');
INSERT INTO `vendor_categories` VALUES (85, '82', 8, 'Tim Steed');
INSERT INTO `vendor_categories` VALUES (86, '82', 8, 'Thiessen Interiors');
INSERT INTO `vendor_categories` VALUES (87, '82', 8, 'Metro Appliances');
INSERT INTO `vendor_categories` VALUES (88, '82', 8, 'Mohammed Jrab');
INSERT INTO `vendor_categories` VALUES (89, '82', 8, 'S & S Glass Co.');
INSERT INTO `vendor_categories` VALUES (90, '82', 8, 'Walmart');
INSERT INTO `vendor_categories` VALUES (91, '82', 8, 'Amazon');
INSERT INTO `vendor_categories` VALUES (92, '82', 8, 'Sherwin Williams');
INSERT INTO `vendor_categories` VALUES (93, '82', 8, 'Cabinet Outlet');
INSERT INTO `vendor_categories` VALUES (94, '82', 8, 'Junk Frog');
INSERT INTO `vendor_categories` VALUES (95, '82', 8, 'Oklahoma County Clerk');
INSERT INTO `vendor_categories` VALUES (96, '82', 8, 'Postal Annex');
INSERT INTO `vendor_categories` VALUES (97, '82', 8, 'Willards Wholesale Roofing');
INSERT INTO `vendor_categories` VALUES (98, '82', 8, 'Lionel Hamilton');
INSERT INTO `vendor_categories` VALUES (99, '82', 8, 'Angie Sharp (Nathan)');
INSERT INTO `vendor_categories` VALUES (100, '82', 8, 'Furniture Options');
INSERT INTO `vendor_categories` VALUES (101, '82', 8, 'Lisa Stit - OK Impressions');
INSERT INTO `vendor_categories` VALUES (102, '82', 8, 'Doyle (Claudia Carren)');
INSERT INTO `vendor_categories` VALUES (103, '83', 8, 'High Level');
INSERT INTO `vendor_categories` VALUES (104, '83', 8, 'A.I. Setter');
INSERT INTO `vendor_categories` VALUES (105, '83', 8, 'Go Daddy');
INSERT INTO `vendor_categories` VALUES (106, '83', 8, 'Cheap Domains');
INSERT INTO `vendor_categories` VALUES (107, '84', 8, 'Sashitha');
INSERT INTO `vendor_categories` VALUES (108, '84', 8, 'Grow With Us Agency');
INSERT INTO `vendor_categories` VALUES (109, '84', 8, 'Podia');
INSERT INTO `vendor_categories` VALUES (110, '85', 8, 'Knoxville Database Alex Sandar Bojicic');
INSERT INTO `vendor_categories` VALUES (111, '85', 8, 'GoDaddy');
INSERT INTO `vendor_categories` VALUES (112, '86', 8, 'Alex Sandar Bojicic');
INSERT INTO `vendor_categories` VALUES (114, '0', 1, 'Vendor_Jack');

SET FOREIGN_KEY_CHECKS = 1;
