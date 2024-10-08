use storeDB;
SELECT * FROM products;
/* ALTER TABLE products
ADD COLUMN category VARCHAR(100) DEFAULT 'General'; */
/* ALTER TABLE products
MODIFY COLUMN id VARCHAR(200); */
/* UPDATE products SET quantity = 100 WHERE id = 'product123'; */
/* DELETE FROM products; */

/* CREATE TABLE history (
    sn int AUTO_INCREMENT UNIQUE,
    id varchar(200) PRIMARY KEY UNIQUE,
    product_id varchar(200) NOT NULL,
    quantity int NOT NULL,
    amount Decimal(10, 2) NOT NULL,
    sale_date datetime NOT NULL,
    sale_id varchar(200) NOT NULL,
    seller_id varchar(200) NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    created_at datetime DEFAULT CURRENT_TIMESTAMP
); */


CREATE TABLE products (
    sn int AUTO_INCREMENT UNIQUE,
    id varchar(200) PRIMARY KEY UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    quantity int NOT NULL,
    price DECIMAL(50, 2) NOT NULL,
    image varchar(200),
    category VARCHAR(100) DEFAULT 'General',
)

/* use storeDB; */
/* DROP TABLE history; */
/* DROP TABLE users; */
/* 
CREATE TABLE users (
    sn int AUTO_INCREMENT UNIQUE,
    id varchar(200) PRIMARY KEY UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) */
/* SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY','')); */

/* SELECT * FROM users; */
/* SELECT * FROM history ; */
/* ALTER TABLE history ADD COLUMN sale_date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL; */
/* DESC history; */

/* SELECT 
    h.sale_id,
    h.product_id,
    p.name AS product_name,
    SUM(h.quantity) AS total_quantity,
    SUM(h.amount) AS total_amount
FROM 
    history h
JOIN 
    products p ON h.product_id = p.id
GROUP BY 
    h.sale_id, h.product_id; */

/* 
SELECT DISTINCT sale_id, id, product_id  from history GROUP BY sale_id; */

/* SELECT 
    *,
    JSON_ARRAYAGG(JSON_OBJECT('product_id', product_id, 'quantity', quantity, 'amount', amount)) AS products
FROM 
    history
WHERE
    seller_id = 'c3ed702a-913c-4e3f-81c6-5e2d6afe1f80'
GROUP BY 
    sale_id; */

/* SELECT 
    seller_id,
    sale_id,
    created_at,
    JSON_ARRAYAGG(JSON_OBJECT('product_id', product_id, 'quantity', quantity, 'amount', amount)) AS products
FROM 
    history
WHERE
    seller_id = 'c3ed702a-913c-4e3f-81c6-5e2d6afe1f80'
GROUP BY 
    sale_id
ORDER BY 
    created_at;  */


/* SELECT 
    h.sale_id,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'product_id', h.product_id,
            'quantity', h.quantity,
            'amount', h.amount,
            'name', p.name,
            'image', p.image
        )
    ) AS products
FROM 
    history h
JOIN 
    products p ON h.product_id = p.id
WHERE
    h.seller_id = 'c3ed702a-913c-4e3f-81c6-5e2d6afe1f80'
GROUP BY 
    h.sale_id
ORDER BY 
    h.created_at DESC; */

SELECT @@global.time_zone, @@session.time_zone;

/* SET GLOBAL time_zone = '+01:00';
SET time_zone = '+01:00'; */
