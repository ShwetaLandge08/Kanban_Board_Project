package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.Comment;
import com.niit.kanban.KanbanService.domain.Project;
import com.niit.kanban.KanbanService.domain.Stage;
import com.niit.kanban.KanbanService.domain.Task;
import com.niit.kanban.KanbanService.exception.NotFoundException;
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
    public Project addCommentOnTask(Comment comment, String taskTitle, int projectId, String stageName) throws NotFoundException {
        if (projectRepository.findById(projectId).isEmpty()) {
            throw new NotFoundException("Project Not Found with this ID");
        }
        Project project = projectRepository.findByProjectId(projectId);
        List<Stage> stages = project.getStages();
        for (Stage stage : stages) {
            if (stage.getName().equals(stageName)) {
                List<Task> getAllTask = stage.getTasks();
                if (getAllTask == null)
                    break;
                for (Task task1 : getAllTask) {
                    if (task1.getTitle().equals(taskTitle)) {
                        List<Comment> comments = task1.getComments();
                        if (comments == null)
                            comments = new ArrayList<>();
//                        int lastId = 0;
//                        if (!comments.isEmpty())
//                            lastId = ((Comment) comments.toArray()[comments.size() - 1]).getId();
//                        comment.setId(lastId + 1);
                        comments.add(comment);
                        task1.setComments(comments);
                    }
                }
                stage.setTasks(getAllTask);
            }
            project.setStages(stages);
        }
        return projectRepository.save(project);
    }

    @Override
    public List<Comment> getAllCommentOnTask(String taskTitle, int projectId, String stageName) throws NotFoundException {
        if (projectRepository.findById(projectId).isEmpty()) {
            throw new NotFoundException("Project Not Found with this ID");
        }
        Project project = projectRepository.findByProjectId(projectId);
        List<Comment> myComments = new ArrayList<>();
        List<Stage> stages = project.getStages();
        for (Stage stage : stages) {
            if (stage.getName().equals(stageName)) {
                List<Task> tasks = stage.getTasks();
                if (tasks == null)
                    break;
                for (Task task1 : tasks) {
                    if (task1.getTitle().equals(taskTitle)) {
                        myComments = task1.getComments();
                        break;
                    }
                }
            }
        }
        return myComments;
    }
}
