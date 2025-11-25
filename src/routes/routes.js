import { Database } from "../database/db.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "../utils/build-route-path.js";

const database = new Database();

export const routes = [
    {
        method: "POST",
        path: buildRoutePath("/tasks"),
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

            return res.end(JSON.stringify(task));
        }
    },
    {
        method: "GET",
        path: buildRoutePath("/tasks"),
        handler: (req, res) => {
            const data = database.select("tasks");
            return res.end(JSON.stringify(data));
        }
    },
//     {
//         method: "PUT",
//         path: buildRoutePath("/tasks/:id"),
//         handler: (req, res) => {
//             // return res.end(); 
//         }
//     }

];
