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

    const showDBTables = async (db) => {
        try {
            const data = await new Promise((resolve, reject) => {
                db.transaction(
                    (tx) => {
                        tx.executeSql(
                            "SELECT * FROM images;",
                            [],
                            (_, { rows: { _array } }) => {
                                console.log("Rows", _array);
                                resolve(_array);
                            },
                            (_, error) => {
                                console.log("Error when selecting", error);
                                reject(error);
                            },
                        );
                    },
                    (error) => {
                        console.log("Transaction failed", error);
                        reject(error);
                    },
                    () => {
                        console.log("Transaction successful");
                    },
                );
            });

            return data;
        } catch (error) {
            console.log("Error while fetching data table from DB: ", error);
        }
    };

    // insert filepaths into db
    const insertIntoDB = (db, filepath) => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "INSERT INTO images (path) VALUES (?);",
                    [filepath],
                    (_, { rows }) => console.log("Rows", JSON.stringify(rows)),
                    (_, error) => console.log("Error when inserting", error),
                );
            });
        } catch (error) {
            console.log("Error while inserting into database:", error);
        }
    };

    // clear db
    const clearDB = (db) => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "DELETE FROM images;",
                    [],
                    (_, { rows }) => console.log("Rows", JSON.stringify(rows)),
                    (_, error) => console.log("Error when deleting", error),
                );
            });
        } catch (error) {
            console.log("Error while clearing database:", error);
        }
    };

    // delete from db
    const deleteFromDB = (db, path) => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "DELETE FROM images WHERE path = ?;",
                    [path],
                    (_, { rowsAffected }) => console.log("Rows affected:", rowsAffected),
                    (_, error) => console.log("Error when deleting", error),
                );
            });
        } catch (error) {
            console.log("Error while deleting from database:", error);
        }
    };

    // initialize
    useEffect(() => {
        const db = SQLite.openDatabase("db.db");
        setDb(db);
    }, []);

    // Initialize the table
    useEffect(() => {
        if (db) {
            initDB();
        }
    }, [db]);

    return (
        <DatabaseContext.Provider value={{ db, initDB, showDBTables, insertIntoDB, clearDB }}>
            {children}
        </DatabaseContext.Provider>
    );
};
