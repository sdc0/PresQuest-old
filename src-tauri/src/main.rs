// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[macro_use]
extern crate lazy_static;

use std::sync::RwLock;

lazy_static!(
    static ref user_str: RwLock<String> = RwLock::new("".to_string());
    static ref class_str: RwLock<String> = RwLock::new("".to_string());
);

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_user() -> String {
    return user_str.read().unwrap().to_string();
}

#[tauri::command]
fn get_class() -> String {
    return class_str.read().unwrap().to_string();
}

#[tauri::command]
fn set_user(user_string: &str) {
    let mut mystr = user_str.write().unwrap();
    *mystr = user_string.to_string();
}

#[tauri::command]
fn set_class(class_string: &str) {
    let mut mystr = class_str.write().unwrap();
    *mystr = class_string.to_string();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_class, get_user, set_class, set_user])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
