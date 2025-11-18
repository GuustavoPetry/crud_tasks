import { Database } from "../database/db.js";
import { randomUUID } from "node:crypto";

const database = new Database();

export const routes = [
    {
        method: "POST",
        path: "/tasks",
        handler: (req, res) => {
            const { title, description } = req.body;
            const dateNow = Date.now();

            const task = {
                id: randomUUID(),
                title: title,
                description: description,
                completed_at: null,
                created_at: dateNow,
                updated_at: dateNow,
            }
            
            database.insert("tasks", task);

            return res.writeHead(200).end(JSON.stringify(task));
        }
    },
    {
        method: "GET",
        path: "/tasks",
        handler: () => {}
    }
];
