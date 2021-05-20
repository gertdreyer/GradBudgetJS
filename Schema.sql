CREATE TABLE IF NOT EXISTS Users (
UserID bigserial PRIMARY KEY NOT NULL,
Oauthlink varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS UserCatagories(
UserCategoryID bigserial PRIMARY KEY NOT NULL,
CatagoryName varchar(30) NOT NULL,
UserID BIGINT NOT NULL,
Budget money NULL, 
FOREIGN KEY(UserID) REFERENCES Users(UserID)
);

CREATE TABLE UserTransactions(
UserExpenceID BIGSERIAL PRIMARY KEY NOT NULL,
Description VARCHAR(30) NOT NULL,
Amount Money NOT NULL,
CategoryID BIGINT,
UserID BIGINT,
month date NOT NULL DEFAULT CURRENT_DATE,
FOREIGN KEY(UserID) REFERENCES Users(UserID),
FOREIGN KEY(CategoryID) REFERENCES UserCatagories(UserCategoryID)
);