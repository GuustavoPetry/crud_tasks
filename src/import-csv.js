import fs from "node:fs";
import { parse } from "csv-parse";
import { Database } from "./database/db.js";
import { randomUUID } from "node:crypto";

const database = new Database();
const tasksListPath = new URL("../tasks-list.csv", import.meta.url);

const importProcess = async () => {
    const taskList = [];
    const read = fs.createReadStream(tasksListPath).pipe(parse({}));
    console.log(read);

    for await (const chunk of read) {
        taskList.push(chunk);
    }

    taskList.shift();

    for (const task of taskList) {
        const [title, description] = task.toString().split(";");
        const data = {
            id: randomUUID(),
            title: title,
            description: description,
            completed_at: null,
            created_at: Date.now(),
            updated_at: null,
        };

        database.insert("tasks", data);
        
    }
}

importProcess();
