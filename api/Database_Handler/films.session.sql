--@block
CREATE TABLE films_store(
    id INT AUTO_INCREMENT,
    film_name VARCHAR(100) NOT NULL UNIQUE,
    film_img_data VARCHAR(255) NOT NULL,
    film_desc TEXT NOT NULL,
    film_video_data VARCHAR(255) NOT NULL,
    film_trailer_link VARCHAR(255) NOT NULL,
    date_time DATETIME NOT NULL,
    PRIMARY KEY(id) 
)


--@block
INSERT INTO films_store (film_name,film_img_data,film_desc,film_video_data,film_trailer_link,date_time)VALUES('Avengers Infinity War','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQasAWVC623pYLx58F8bb8zALVN-gXWnAW3wQ&s','Movie Description','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQasAWVC623pYLx58F8bb8zALVN-gXWnAW3wQ&s','https://www.youtube.com/embed/6ZfuNTqbHE8?si=D38RqicQ7JeSxfJ2',"2025-04-08 17:06:47"),('Captain America and The Winter Soldier','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfeGs98TxZWC7P208BRXblrU7_MlTQ0GXUUw&s','Movie Description','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfeGs98TxZWC7P208BRXblrU7_MlTQ0GXUUw&s',"https://www.youtube.com/embed/7SlILk2WMTI?si=iaG2vEN9H0YT3nCW","2025-04-08 17:06:47"),('Man Of Steel'
,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQSg-95KlVf55oWDNRr3pbELICJ9TgXXKouA&s','Movie Description','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQSg-95KlVf55oWDNRr3pbELICJ9TgXXKouA&s',"https://www.youtube.com/embed/T6DJcgm3wNY?si=zPhbDUkj8dK3DMQ4","2025-04-08 17:06:47"),('The Gorge','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJSEuwUZCm4s_M-IkJUgVMm_bdnNmy8HgVw&s','Movie Desc','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJSEuwUZCm4s_M-IkJUgVMm_bdnNmy8HgVw&s',"https://www.youtube.com/embed/rUSdnuOLebE?si=7zieF6mAROfPxXrY",'2025-04-08 17:06:47'),('The Last Czars','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcdU51nKPEfbEbmr0MTFcMb79oidw1UBQdfw&s','Movie Desc','video','https://www.youtube.com/embed/8iqySCbxCz8?si=fG7vehickDrFHbwm','2025-04-08 17:06:47'),
('Sherlock Holmes'
,'https://resizing.flixster.com/5qMifzXcYpTtT5rppUgTiDnTFN8=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p3547340_p_v8_af.jpg','Movie Desc','video','https://www.youtube.com/embed/J7nJksXDBWc?si=0_iOVkSa05RQX_C8','2025-04-08 17:06:47'),
('Death Of Superman','https://upload.wikimedia.org/wikipedia/en/7/72/The_Death_of_Superman_Bluray_cover.jpg','Movie Desc','Video','https://www.youtube.com/embed/J5aMJ1qMgA8?si=4n_4OB2jQGF6R8sD','2025-04-08 17:06:47'),
('How to be a Mob Boss','https://m.media-amazon.com/images/M/MV5BMjhlZDQ0MTAtMDU5NC00OTg4LTg5NTAtYmNiM2Q4N2FlZDA2XkEyXkFqcGc@._V1_QL75_UY207_CR4,0,140,207_.jpg','Movie Desc','video','https://www.youtube.com/embed/B9Zxq5IrA5g?si=80xN-WALT8f2NMGR','2025-04-08 17:06:47'),
('The Dark Knight Rises','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJvNwWqFW-v83DkI0NiLS1NvxHhDrw9s9FYw&s','Movie Desc','video','https://www.youtube.com/embed/g8evyE9TuYk?si=bhxGhx-WfMj-YdTS','2025-04-08 17:06:47'),
('Idea Of You','https://m.media-amazon.com/images/M/MV5BYzFmYmU0N2YtOGZhNy00MDEyLWJkOWUtMDdhOTVhODNmZTNjXkEyXkFqcGc@._V1_.jpg','Movie Desc','video','https://www.youtube.com/embed/V8i6PB0gGOA?si=8u51KA9hbpnoKzHI','2025-04-08 17:06:47'),
('Ghosted','https://i.pinimg.com/736x/43/e4/d6/43e4d619dc44b1a2fd5b2a35cfc4fdf2.jpg','Movie Desc','video','https://www.youtube.com/embed/IAdCsNtEuBU?si=XlGHbaEEP64-Kqg6','2025-04-08 17:06:47'),('The GodFather','https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg','Movie Desc','video','https://www.youtube.com/embed/UaVTIH8mujA?si=Zp-PVYr3w70HvxFC','2025-04-08 17:06:47'),
('The Adam Project','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeLkFkR5x4LlRW81Ezz93yZrcMGA5YnZwoiw&s','Movie Desc','video','https://www.youtube.com/embed/IE8HIsIrq4o?si=f4PSAWN7vDX7cX9z','2025-04-08 17:06:47')

--@block
DROP TABLE films_store;