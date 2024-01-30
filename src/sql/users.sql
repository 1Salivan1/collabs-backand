create TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) UNIQUE,
    email VARCHAR(1000) UNIQUE,
    password VARCHAR,
    tags VARCHAR[],
    about VARCHAR(2000),
    socials VARCHAR[],
    avatarurl VARCHAR
);

create TABLE projects(
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    text VARCHAR(3000),
    needs VARCHAR[],
    socials VARCHAR[],
    creator_id INTEGER,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);