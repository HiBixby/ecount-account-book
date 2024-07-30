# ecount-account-book
가계부

## 데이터베이스 및 테이블 생성
```mysql
CREATE DATABASE household_db;

USE household_db;

CREATE TABLE household_account (
    id INT AUTO_INCREMENT PRIMARY KEY,     
    date DATE NOT NULL,                  
    asset VARCHAR(255) NOT NULL,          
    category VARCHAR(255) NOT NULL,      
    description TEXT,                    
    amount INT NOT NULL,                 
    memo TEXT,                          
    type ENUM('income', 'expense') NOT NULL 
);

```
