# ecount-account-book
가계부

## 데이터베이스 및 테이블 생성
```mysql
CREATE database household_db;
USE household_db;

CREATE TABLE category
  (
     id        INT auto_increment PRIMARY KEY,
     name      VARCHAR(255) NOT NULL,
     type      ENUM('income', 'expense') NOT NULL,
     parent_id INT,
     FOREIGN KEY (parent_id) REFERENCES category(id)
  );

CREATE TABLE household_account
  (
     id               INT auto_increment PRIMARY KEY,
     transaction_date TIMESTAMP NOT NULL,
     asset            VARCHAR(255) NOT NULL,
     category_id      INT NOT NULL,
     description      TEXT,
     amount           INT NOT NULL,
     memo             TEXT,
     type             ENUM('income', 'expense') NOT NULL,
     FOREIGN KEY (category_id) REFERENCES category(id)
  );

INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('1', '유동생활비', 'expense', NULL);
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('2', '고정생활비', 'expense', NULL);
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('3', '증여,세금,기타비용', 'expense', NULL);
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('4', '식비', 'expense', '1');
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('5', '여행,여가', 'expense', '1');
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('6', '교통비', 'expense', '1');
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('7', '생활용품', 'expense', '1');
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('8', '지식,문화', 'expense', '1');
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('9', '의복,미용', 'expense', '1');
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('10', '수리,수선', 'expense', '1');
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('11', '주거,통신', 'expense', '2');
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('12', '교육비', 'expense', '2');
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('13', '의료,건강보험', 'expense', '2');
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('14', '증여,세금,이자', 'expense', '3');
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('15', '경조사비', 'expense', '3');
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('16', '월급여', 'income', NULL);
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('17', '월급', 'income', '16');
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('18', '퇴직연금', 'income', '16');
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('19', '비정기소득', 'income', NULL);
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('20', '상여금', 'income', '19');
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('21', '배당금', 'income', '19');
INSERT INTO `household_db`.`category` (`id`, `name`, `type`, `parent_id`) VALUES ('22', '기타수익', 'income', '19');

```

## ENV 파일
backend/.env
```
DB_PASSWORD = "DB 비밀번호”
```
