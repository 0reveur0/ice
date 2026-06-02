#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;
mod models;
mod commands;

fn main() {
    // Initialize the database connection pool
    let _ = database::CONNECTION_POOL.get().expect("Failed to initialize database pool");

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::add_task,
            commands::get_all_tasks
        ])
        .run(tauri::generate_context!()) 
        .expect("error while running tauri application");
}
