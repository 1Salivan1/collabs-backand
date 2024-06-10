create TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(200) UNIQUE,
    email VARCHAR(1000) UNIQUE,
    password VARCHAR,
    tags VARCHAR[],
    about VARCHAR(2000),
    telegram VARCHAR,
    discord VARCHAR,
    linkedin VARCHAR,
    avatarurl VARCHAR
);

create TABLE projects(
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    tags VARCHAR[],
    text VARCHAR(3000),
    needs VARCHAR[],
    telegram VARCHAR,
    discord VARCHAR,
    linkedin VARCHAR,
    creator_id INTEGER,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);