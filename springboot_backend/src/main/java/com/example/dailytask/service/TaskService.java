package com.example.dailytask.service;

import com.example.dailytask.model.Task;
import com.example.dailytask.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    // Fetch all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
}
