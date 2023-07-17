CREATE TABLE `usersdb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `gender` VARCHAR(45) NOT NULL,
  `phone` INT NULL,
  `password` VARCHAR(256) NOT NULL,
  `status` VARCHAR(45) NOT NULL DEFAULT 'pending',
  `dob` DATE NULL,
  `profile_pic` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;