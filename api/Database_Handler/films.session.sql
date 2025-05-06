--@block
CREATE TABLE users(
    id INT AUTO_INCREMENT,
    google_id VARCHAR(255) UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    password TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);


--@block
CREATE TABLE films(
    id INT AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL UNIQUE,
    img VARCHAR(255) NOT NULL,
    film_desc TEXT,
    film_cast TEXT NOT NULL,
    film_type VARCHAR(100) NOT NULL,
    release_year INT NOT NULL,
    trailer_link VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id) 
)

--@block
CREATE TABLE genres(
    id INT AUTO_INCREMENT,
    film_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(film_id) REFERENCES films(id)
)

--@block
CREATE TABLE series(
    id INT AUTO_INCREMENT,
    film_id INT NOT NULL,
    season INT NOT NULL,
    episode INT NOT NULL,
    episode_desc TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(film_id) REFERENCES films(id)
)

--@block
CREATE TABLE uploads(
    id INT AUTO_INCREMENT,
    film_id INT NOT NULL,
    video TEXT NOT NULL,
    series_id INT,
    size INT NOT NULL,
    film_ext VARCHAR(30) NOT NULL,
    vid_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(film_id) REFERENCES films(id),
    FOREIGN KEY(series_id) REFERENCES series(id)
)



--@block
CREATE TABLE records(
    id INT AUTO_INCREMENT,
    user__id INT NOT NULL,
    film_id INT NOT NULL,
    upl_id INT NOT NULL,
    record_type VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(user__id) REFERENCES users(id),
    FOREIGN KEY(film_id) REFERENCES films(id),
    FOREIGN KEY(upl_id) REFERENCES uploads(id)
)




--@block
INSERT INTO films (title,img,film_desc,film_cast,film_type,release_year,trailer_link)VALUES('Avengers Infinity War','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQasAWVC623pYLx58F8bb8zALVN-gXWnAW3wQ&s','Movie Description','cast','MOVIE','2018','https://www.youtube.com/embed/6ZfuNTqbHE8?si=D38RqicQ7JeSxfJ2'),
('Captain America and The Winter Soldier','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfeGs98TxZWC7P208BRXblrU7_MlTQ0GXUUw&s','Movie Description','cast','MOVIE','2014',"https://www.youtube.com/embed/7SlILk2WMTI?si=iaG2vEN9H0YT3nCW"),('Man Of Steel'
,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQSg-95KlVf55oWDNRr3pbELICJ9TgXXKouA&s','Movie Description','cast','MOVIE','2013',"https://www.youtube.com/embed/T6DJcgm3wNY?si=zPhbDUkj8dK3DMQ4"),('The Gorge','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJSEuwUZCm4s_M-IkJUgVMm_bdnNmy8HgVw&s','Movie Desc','cast','MOVIE','2025',"https://www.youtube.com/embed/rUSdnuOLebE?si=7zieF6mAROfPxXrY"),('The Last Czars','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcdU51nKPEfbEbmr0MTFcMb79oidw1UBQdfw&s','','cast','SERIE','2020','https://www.youtube.com/embed/8iqySCbxCz8?si=fG7vehickDrFHbwm'),
('Sherlock Holmes','https://resizing.flixster.com/5qMifzXcYpTtT5rppUgTiDnTFN8=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p3547340_p_v8_af.jpg','Movie Desc','cast','MOVIE','2016','https://www.youtube.com/embed/J7nJksXDBWc?si=0_iOVkSa05RQX_C8'),
('Death Of Superman','https://upload.wikimedia.org/wikipedia/en/7/72/The_Death_of_Superman_Bluray_cover.jpg','Movie Desc','Cast','ANIMATED_MOVIE','2019','https://www.youtube.com/embed/J5aMJ1qMgA8?si=4n_4OB2jQGF6R8sD'),
('How to be a Mob Boss','https://m.media-amazon.com/images/M/MV5BMjhlZDQ0MTAtMDU5NC00OTg4LTg5NTAtYmNiM2Q4N2FlZDA2XkEyXkFqcGc@._V1_QL75_UY207_CR4,0,140,207_.jpg','','Cast','SERIE','2020','https://www.youtube.com/embed/B9Zxq5IrA5g?si=80xN-WALT8f2NMGR'),
('The Dark Knight Rises','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJvNwWqFW-v83DkI0NiLS1NvxHhDrw9s9FYw&s','Movie Desc','Cast','MOVIE','2012','https://www.youtube.com/embed/g8evyE9TuYk?si=bhxGhx-WfMj-YdTS'),
('Idea Of You','https://m.media-amazon.com/images/M/MV5BYzFmYmU0N2YtOGZhNy00MDEyLWJkOWUtMDdhOTVhODNmZTNjXkEyXkFqcGc@._V1_.jpg','Movie Desc','Cast','MOVIE','2024','https://www.youtube.com/embed/V8i6PB0gGOA?si=8u51KA9hbpnoKzHI'),
('Ghosted','https://i.pinimg.com/736x/43/e4/d6/43e4d619dc44b1a2fd5b2a35cfc4fdf2.jpg','Movie Desc','Cast','MOVIE','2023','https://www.youtube.com/embed/IAdCsNtEuBU?si=XlGHbaEEP64-Kqg6'),('The GodFather','https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg','','Cast','SERIE','2013','https://www.youtube.com/embed/UaVTIH8mujA?si=Zp-PVYr3w70HvxFC'),
('The Adam Project','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeLkFkR5x4LlRW81Ezz93yZrcMGA5YnZwoiw&s','Movie Desc','cast','MOVIE','2022','https://www.youtube.com/embed/IE8HIsIrq4o?si=f4PSAWN7vDX7cX9z')

--@block
DROP TABLE records;
DROP TABLE uploads;
DROP TABLE series;
DROP TABLE genres; 
DROP TABLE films;
-- DROP TABLE users;