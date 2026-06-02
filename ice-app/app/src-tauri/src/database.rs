'''
use lazy_static::lazy_static;
use r2d2_sqlite::SqliteConnectionManager;
use rusqlite::Connection;
use std::fs;
use std::path::PathBuf;
use tauri::api::path::app_data_dir;
use tauri::Config;

type Pool = r2d2::Pool<SqliteConnectionManager>;
pub type DbConnection = r2d2::PooledConnection<SqliteConnectionManager>;

lazy_static! {
    pub static ref CONNECTION_POOL: Pool = setup_database();
}

fn get_db_path() -> PathBuf {
    let mut db_path = app_data_dir(&Config::default()).unwrap();
    fs::create_dir_all(&db_path).expect("Failed to create app data directory");
    db_path.push("ice.db");
    db_path
}

fn initialize_database(conn: &Connection) {
    let schema = include_str!("../../../database_schema.sql");
    conn.execute_batch(schema)
        .expect("Failed to execute initial schema");
}

fn setup_database() -> Pool {
    let db_path = get_db_path();
    let manager = SqliteConnectionManager::file(db_path);
    let pool = r2d2::Pool::new(manager).expect("Failed to create DB pool");

    let conn = pool.get().expect("Failed to get connection for initialization");
    initialize_database(&conn);

    pool
}

// Public function to get a connection from the pool
pub fn get_connection() -> DbConnection {
    CONNECTION_POOL.get().expect("Failed to get connection from pool")
}
''