-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 11, 2025 at 03:37 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nikeapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(50) NOT NULL,
  `admin_name` varchar(59) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `admin_name`, `email`, `password`) VALUES
(1, 'admin', 'admin@gmail.com', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `shoes_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `total` decimal(10,2) NOT NULL,
  `added_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `UserId`, `shoes_id`, `quantity`, `total`, `added_at`) VALUES
(78, 33, 5, 1, '8295.00', '2025-05-27 11:04:01'),
(72, 7, 4, 1, '12295.00', '2025-05-27 03:24:52'),
(79, 7, 2, 1, '11895.00', '2025-05-28 05:16:46'),
(88, 4298, 2, 1, '11895.00', '2025-05-31 10:51:31'),
(89, 33, 4, 1, '12295.00', '2025-06-02 04:54:50'),
(90, 38, 1, 1, '12795.00', '2025-07-11 10:02:57');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(50) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'Basketball Shoes'),
(2, 'Running Shoes'),
(3, 'Sneakers'),
(4, 'GYM Shoes'),
(5, ' Mens Shoes'),
(6, ' 	Sports Shoes'),
(7, ' 	Stylish-Shoes'),
(8, 'Footwear Shoes'),
(11, 'Womens Shoes'),
(12, 'zxscdx');

-- --------------------------------------------------------

--
-- Table structure for table `collection`
--

CREATE TABLE `collection` (
  `collection_id` int(50) NOT NULL,
  `collection_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `collection`
--

INSERT INTO `collection` (`collection_id`, `collection_name`) VALUES
(1, 'Giannis Freak 6 EP'),
(2, 'Nike Pegasus 41'),
(3, 'DUNK'),
(4, 'AIR FORCE 1'),
(5, 'ACG Watercat'),
(6, 'Air Force 07');

-- --------------------------------------------------------

--
-- Table structure for table `favourite`
--

CREATE TABLE `favourite` (
  `f_id` int(50) NOT NULL,
  `UserId` int(50) NOT NULL,
  `shoes_id` int(50) NOT NULL,
  `saved_at` timestamp NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `favourite`
--

INSERT INTO `favourite` (`f_id`, `UserId`, `shoes_id`, `saved_at`) VALUES
(1, 6, 1, '2025-05-09 11:10:04'),
(2, 6, 4, '2025-05-10 03:03:43'),
(3, 1, 1, '2025-05-13 10:57:10'),
(4, 1, 2, '2025-05-17 11:16:00'),
(5, 38, 1, '2025-07-11 10:03:07');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `img_id` int(50) NOT NULL,
  `img_path` varchar(50) NOT NULL,
  `shoes_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`img_id`, `img_path`, `shoes_id`) VALUES
(1, 'Giannis Freak 6 EP', 1),
(1, 'Giannis Freak 6 EP2', 1),
(1, 'Giannis Freak 6 EP3', 1),
(1, 'Giannis Freak 6 EP4', 1),
(1, 'Giannis Freak 6 EP5', 1),
(1, 'Giannis Freak 6 EP6', 1),
(1, 'Giannis Freak 6 EP7', 1),
(1, 'Giannis Freak 6 EP8', 1),
(1, 'Giannis Freak 6 EP9', 1),
(2, 'Nike Pegasus 41', 2),
(2, 'Nike Pegasus 41-2', 2),
(2, 'Nike Pegasus 41-3', 2),
(2, 'Nike Pegasus 41-4', 2),
(2, 'Nike Pegasus 41-5', 2),
(2, 'Nike Pegasus 41-6', 2),
(2, 'Nike Pegasus 41-7', 2),
(2, 'Nike Pegasus 41-8', 2),
(4, 'Air Jordan 1 Low', 4),
(4, 'Air Jordan 1 Low2', 4),
(4, 'Air Jordan 1 Low3', 4),
(4, 'Air Jordan 1 Low4', 4),
(4, 'Air Jordan 1 Low5', 4),
(4, 'Air Jordan 1 Low6', 4),
(4, 'Air Jordan 1 Low7', 4),
(4, 'Air Jordan 1 Low8', 4),
(5, 'Air Jordan', 5),
(5, 'Air Jordan2', 5),
(5, 'Air Jordan3', 5),
(5, 'Air Jordan4', 5),
(5, 'Air Jordan5', 5),
(5, 'Air Jordan6', 5),
(5, 'Air Jordan7', 5),
(5, 'Air Jordan8', 5),
(6, 'Nike Zoom Pegasus 41', 6),
(6, 'Nike Zoom Pegasus 41-2', 6),
(6, 'Nike Zoom Pegasus 41-3', 6),
(6, 'Nike Zoom Pegasus 41-4', 6),
(6, 'Nike Zoom Pegasus 41-5', 6),
(6, 'Nike Zoom Pegasus 41-6', 6),
(6, 'Nike Zoom Pegasus 41-7', 6),
(6, 'Nike Zoom Pegasus 41-8', 6);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `shoes_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `UserId`, `shoes_id`, `quantity`, `total`, `order_date`, `name`, `address`, `email`) VALUES
(1, 5451, 2, 1, '11895.00', '2024-10-15 15:37:48', 'admin', 'jetpur', 'admin@gmail.com'),
(2, 1, 3, 1, '11895.00', '2024-10-15 15:38:34', 'rutu vakhecha', 'derdi jetpur', 'rutu@gmail.com'),
(3, 3709, 5, 1, '8295.00', '2024-10-15 15:40:50', 'Gunjan Vakhecha', 'jamnagar', 'gunjan@gmail.com'),
(7, 7, 2, 2, '24190.00', '2025-05-31 16:18:33', 'rutu vakhecha', 'rajkot', 'rutuvakhecha@gmail.com'),
(8, 4298, 2, 1, '11895.00', '2025-05-31 21:51:40', 'rutu vakhecha', 'jaypur', 'rutu@gmail.com'),
(9, 7, 2, 2, '24190.00', '2025-05-31 16:26:41', 'diya vaghela', 'jetpur', 'diya@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `shoes`
--

CREATE TABLE `shoes` (
  `shoes_id` int(50) NOT NULL,
  `color` varchar(50) NOT NULL,
  `price` decimal(65,0) NOT NULL,
  `size` decimal(65,0) NOT NULL,
  `description` text NOT NULL,
  `Style` varchar(50) NOT NULL,
  `Country` varchar(50) NOT NULL,
  `img_id` int(50) NOT NULL,
  `collection_id` int(50) NOT NULL,
  `collection_name` varchar(50) NOT NULL,
  `category_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shoes`
--

INSERT INTO `shoes` (`shoes_id`, `color`, `price`, `size`, `description`, `Style`, `Country`, `img_id`, `collection_id`, `collection_name`, `category_id`) VALUES
(1, ' Coconut Milk/Sail/University Red/Aster Pink', '12795', '6', 'Giannis needs a shoe to dominate the modern positionless game. Thats why we have upgraded the traction pattern on the Giannis Freak 6. The outsole helps him stop in an instant to make all those game-changing plays. And when hes filling up the stat sheet, the Air Zoom cushioning helps keep him fresh for four quarters. With its extra-durable rubber outsole, this version gives you traction for outdoor courts. This special edition pays tribute to Giannis dad.', 'FV1294-100', 'Vietnam', 1, 1, 'Giannis Freak 6 EP', 1),
(2, 'Astronomy Blue/Black/Baltic Blue/Hot Punch', '11895', '9', 'Responsive cushioning in the Pegasus provides an energised ride for everyday road running. Experience lighter-weight energy return with dual Air Zoom units and a ReactX foam midsole. Plus, improved engineered mesh on the upper decreases weight and increases breathability.', 'FQ0965-002', 'China', 2, 2, 'Nike Pegasus 41', 2),
(4, 'Gym Red/Metallic Gold', '12295', '7', 'The latest luxe creation from the Method of Make series takes your outfit beyond the norm. The tonal design is colour-matched throughout, from the tongue to the laces to the outsole. The oversized leather stitch detailing and super-clean metallic accents add a textural touch.', 'FN5032-607', 'China', 4, 4, 'Air Jordan 1 Low ', 4),
(5, 'White/Sail/Bordeaux', '8295', '9', 'Always in, always fresh. The Air Jordan 1 Low sets you up with a piece of Jordan history and heritage thats comfortable all day. Choose your colours, then step out in the iconic profile thats built with a high-end mix of materials and encapsulated Air in the heel.', 'DC0774-161', 'Vietnam', 5, 5, 'Air Jordan', 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserId` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserId`, `Name`, `Email`, `Password`, `Address`) VALUES
(35, 'rutu vakhecha', 'rv@gmail.com', '$2y$10$HMBasRY9HsBGb3rIKWdTlesYLwF3SbaXpuke5QtVg1ZAzGz0QMlZO', 'junagadh'),
(7, 'baldev vakhesa', 'balu@gmail.com', 'baldev', 'navagadh'),
(2, 'gunjan vakhecha', 'gunjan@gmail.com', '$2y$10$gWto7bdICPJcOhSz9SuuSedajW9sGoRnGtzYVMipsMvUfKCKf7U4S', 'rajkot'),
(3, 'riya', 'riya@gmail.com', '$2y$10$ZZsj0blsqyz5UGsSiI3vF.X1neHnPbz7duUH2Gtl4XY1EIpW9iMAW', 'junagadh'),
(36, 'sita', 'sita@gmail.com', 'sitaram', 'ayodhya'),
(37, 'nandani', 'n@gmail.com', 'nnn', 'derdi jetpur'),
(38, 'admin', 'rutuvakhecha@gmail.com', 'rutu', 'jaypur'),
(33, 'vidya', 'vidya@gmail.com', 'vidya', 'derdi jetpur'),
(34, 'admin', 'admin@gmail.com', '$2y$10$Pat5/rQDuMH8wPVZNoFBV.lHvrCKDRTZPCIgM0H9ARFKtBxPOUyEu', 'jetpur');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `shoes_id` (`shoes_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`collection_id`);

--
-- Indexes for table `favourite`
--
ALTER TABLE `favourite`
  ADD PRIMARY KEY (`f_id`),
  ADD KEY `fk_id` (`UserId`),
  ADD KEY `fk_sid` (`shoes_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `shoes_id` (`shoes_id`);

--
-- Indexes for table `shoes`
--
ALTER TABLE `shoes`
  ADD PRIMARY KEY (`shoes_id`),
  ADD UNIQUE KEY `shoes_id_unique` (`shoes_id`),
  ADD KEY `fk_cid` (`category_id`);
ALTER TABLE `shoes` ADD FULLTEXT KEY `description` (`description`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `collection`
--
ALTER TABLE `collection`
  MODIFY `collection_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `favourite`
--
ALTER TABLE `favourite`
  MODIFY `f_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `shoes`
--
ALTER TABLE `shoes`
  MODIFY `shoes_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `shoes`
--
ALTER TABLE `shoes`
  ADD CONSTRAINT `fk_cid` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
