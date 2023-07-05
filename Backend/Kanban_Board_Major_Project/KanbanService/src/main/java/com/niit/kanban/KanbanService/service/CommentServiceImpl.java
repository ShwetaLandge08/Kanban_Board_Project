package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.Comment;
import com.niit.kanban.KanbanService.domain.Project;
import com.niit.kanban.KanbanService.domain.Stage;
import com.niit.kanban.KanbanService.domain.Task;
import com.niit.kanban.KanbanService.exception.CommentAlreadyExistsException;
import com.niit.kanban.KanbanService.exception.ProjectNotFoundException;
import com.niit.kanban.KanbanService.exception.StageAlreadyExistsException;
import com.niit.kanban.KanbanService.exception.TaskNotFoundException;
import com.niit.kanban.KanbanService.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    private final ProjectRepository projectRepository;

    @Autowired
    public CommentServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project addCommentOnTask(Comment comment, int taskId, int projectId, String stageName) throws ProjectNotFoundException, CommentAlreadyExistsException, TaskNotFoundException {
        if (projectRepository.findById(projectId).isEmpty()) {
            throw new ProjectNotFoundException();
        }
        Project project = projectRepository.findByProjectId(projectId);
        List<Stage> stages = project.getStages();
        for (Stage stage : stages) {
            if (stage.getName().equals(stageName)) {
                List<Task> getAllTask = stage.getTasks();
                if (getAllTask == null)
                    break;
                for (Task task1 : getAllTask) {
                    if (task1.getId() == taskId) {
                        List<Comment> comments = task1.getComments();
                        if (comments == null)
                            comments = new ArrayList<>();
                        int lastId = 0;
                        if (!comments.isEmpty())
                            lastId = ((Comment) comments.toArray()[comments.size() - 1]).getId();
                        comment.setId(lastId + 1);
                        comments.add(comment);
                        task1.setComments(comments);
                    }
                }
            }
        }
        return projectRepository.save(project);
    }

    @Override
    public List<Comment> getAllCommentOnTask(int taskId, int projectId, String stageName) throws ProjectNotFoundException, TaskNotFoundException {
        if (projectRepository.findById(projectId).isEmpty()) {
            throw new ProjectNotFoundException();
        }
        Project project = projectRepository.findByProjectId(projectId);
        List<Comment> myComments = new ArrayList<>();
        List<Stage> stages = project.getStages();
        for (Stage stage : stages) {
            if (stage.getName().equals(stageName)) {
                List<Task> tasks = stage.getTasks();
                if (tasks == null)
                    break;
                for (Task task : tasks) {
                    if (task.getId() == taskId) {
                        myComments = task.getComments();
                    }
                }
            }
        }
        return myComments;
    }
}
