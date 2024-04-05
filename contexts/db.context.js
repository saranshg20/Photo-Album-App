import React, { createContext, useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";

export const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);

  // initialize database
  const initDB = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT);",
          [],
          () => console.log("Table created successfully"),
          (_, error) => console.log("Error when creating table", error),
        );
      });
    } catch (error) {
      console.log("Error while initializing database:", error);
    }
  };

  const showDBTables = () => {
    try {
      db.transaction(
        (tx) => {
          console.log("Executing SQL query");
          tx.executeSql(
            "SELECT * FROM images;",
            [],
            (_, { rows }) => console.log("Rows", JSON.stringify(rows)),
            (_, error) => console.log("Error when selecting", error),
          );
        },
        (error) => {
          console.log("Transaction failed", error);
        },
        () => {
          console.log("Transaction successful");
        },
      );
    } catch (error) {
      console.log("Error while fetching data table from DB: ", error);
    }
  };

  // insert filepaths into db
  const insertIntoDB = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO images (path) VALUES (?);",
          [newLocation],
          (_, { rows }) => console.log("Rows", JSON.stringify(rows)),
          (_, error) => console.log("Error when inserting", error),
        );
      });
    } catch (error) {
      console.log("Error while inserting into database:", error);
    }
  };

  useEffect(() => {
    const db = SQLite.openDatabase("db.db");
    setDb(db);
  }, []);

  return (
    <DatabaseContext.Provider value={{ db, initDB, showDBTables, insertIntoDB }}>{children}</DatabaseContext.Provider>
  );
};
