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
            const { search } = req.query;

            const data = database.select("tasks", search ? {
                title: search,
                description: search,
            } : null);

            return res.end(JSON.stringify(data));
        }
    },
    {
        method: "PUT",
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params;
            const { title, description } = req.body;
            const updated_at = Date.now();
            const update = database.update("tasks", id, { title, description, updated_at });
            
            if(update) {
                return res.end(JSON.stringify(update));
            } else {
                return res.writeHead(500).end("Falha Interna");
            }
        }
    },
    {
        method: "PATCH",
        path: buildRoutePath("/tasks/:id/complete"),
        handler: (req, res) => {
            const { id } = req.params;
            const completeTask = database.completeTask("tasks", id);

            if(completeTask) {
                return res.end(JSON.stringify(completeTask));
            }
            return res.writeHead(500).end();
        }
    },
    {
        method: "DELETE",
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params;
            const remove = database.delete("tasks", id);

            if(remove) {
                return res.end();
            } else {
                return res.writeHead(500).end("Falha Interna");
            }
        }
    }

];
