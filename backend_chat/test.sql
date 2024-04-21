CREATE TABLE Users (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    Username VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    DateOfBirth DATE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Users (Username, Password, Email, FirstName, LastName, DateOfBirth)
VALUES
    ('user1', 'password1', 'user1@example.com', 'John', 'Doe', '1990-05-15'),
    ('user2', 'password2', 'user2@example.com', 'Jane', 'Smith', '1985-09-21'),
    ('user3', 'password3', 'user3@example.com', 'David', 'Johnson', '1988-03-10'),
    ('user4', 'password4', 'user4@example.com', 'Sarah', 'Williams', '1992-12-05'),
    ('user5', 'password5', 'user5@example.com', 'Michael', 'Brown', '1995-07-28'),
    ('user6', 'password6', 'user6@example.com', 'Emily', 'Jones', '1987-11-14'),
    ('user7', 'password7', 'user7@example.com', 'Alex', 'Martinez', '1993-04-02'),
    ('user8', 'password8', 'user8@example.com', 'Jessica', 'Lee', '1984-06-30'),
    ('user9', 'password9', 'user9@example.com', 'Kevin', 'Garcia', '1991-08-18'),
    ('user10', 'password10', 'user10@example.com', 'Amanda', 'Taylor', '1989-02-25'),
    ('user11', 'password11', 'user11@example.com', 'Robert', 'Clark', '1994-10-12'),
    ('user12', 'password12', 'user12@example.com', 'Melissa', 'Moore', '1986-07-07'),
    ('user13', 'password13', 'user13@example.com', 'Eric', 'Anderson', '1990-03-29'),
    ('user14', 'password14', 'user14@example.com', 'Samantha', 'Wilson', '1983-09-16'),
    ('user15', 'password15', 'user15@example.com', 'Daniel', 'White', '1996-01-08'),
    ('user16', 'password16', 'user16@example.com', 'Rachel', 'Brown', '1988-12-24'),
    ('user17', 'password17', 'user17@example.com', 'Patrick', 'Harris', '1993-06-11'),
    ('user18', 'password18', 'user18@example.com', 'Linda', 'Walker', '1985-04-03'),
    ('user19', 'password19', 'user19@example.com', 'Matthew', 'King', '1992-10-19'),
    ('user20', 'password20', 'user20@example.com', 'Laura', 'Young', '1987-02-17');
