package com.example.dailytask.controller;

import com.example.dailytask.model.Task;
import com.example.dailytask.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200") // Frontend Angular ke liye
public class TaskController {
    @Autowired
    private TaskService taskService;

    // API to get all tasks
    @GetMapping("/tasks")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }
}
