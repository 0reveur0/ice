use crate::database;
use crate::models::Task;
use chrono::Utc;

#[tauri::command]
pub fn add_task(title: String, description: Option<String>, due_date: Option<String>, priority: Option<i32>) -> Result<i64, String> {
    let conn = database::get_connection();
    let now = Utc::now().to_rfc3339();

    let status = "pending".to_string(); // Default status

    let result = conn.execute(
        "INSERT INTO tasks (title, description, status, due_date, priority, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
        &[
            &title as &dyn rusqlite::ToSql,
            &description,
            &status,
            &due_date,
            &priority,
            &now,
            &now,
        ],
    );

    match result {
        Ok(_) => Ok(conn.last_insert_rowid()),
        Err(e) => Err(format!("Failed to add task: {}", e)),
    }
}

#[tauri::command]
pub fn get_all_tasks() -> Result<Vec<Task>, String> {
    let conn = database::get_connection();
    let mut stmt = conn.prepare("SELECT id, title, description, status, due_date, priority, created_at, updated_at FROM tasks").unwrap();

    let task_iter = stmt.query_map([], |row| {
        Ok(Task {
            id: row.get(0)?,
            title: row.get(1)?,
            description: row.get(2)?,
            status: row.get(3)?,
            due_date: row.get(4)?,
            priority: row.get(5)?,
            created_at: row.get(6)?,
            updated_at: row.get(7)?,
        })
    }).unwrap();

    let mut tasks = Vec::new();
    for task in task_iter {
        tasks.push(task.unwrap());
    }

    Ok(tasks)
}
