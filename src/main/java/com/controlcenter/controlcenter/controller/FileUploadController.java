package com.controlcenter.controlcenter.controller;

import java.io.IOException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.controlcenter.controlcenter.model.StoredFileOutput;
import com.controlcenter.controlcenter.service.StoredFileService;
import com.controlcenter.controlcenter.shared.StorageFileNotFoundException;

@Controller
@RestController
@RequestMapping("/profile")
public class FileUploadController {

    private final StoredFileService storageService;

    @Autowired
    public FileUploadController(StoredFileService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/save-file")
    public String listUploadedFiles(Model model) throws IOException {

        model.addAttribute("files", storageService.loadAll().map(
                path -> MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                        "serveFile", path.getFileName().toString()).build().toUri().toString())
                .collect(Collectors.toList()));

        return "uploadForm";
    }

    // @GetMapping("/files/{filename:.+}")
    // @ResponseBody
    // public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

    // Resource file = storageService.loadAsResource(filename);
    // return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
    // "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    // }

    @GetMapping("/preview/{filename:.+}/{id}/{emp_id}")
    public ResponseEntity<Resource> previewFile(@PathVariable String filename, @PathVariable String id, @PathVariable String emp_id) {
        return storageService.previewFile(filename, id, emp_id);

    }
    
    // @GetMapping("/view/{id}")
    // public ResponseEntity<byte[]> getPreviewImg(@PathVariable Long id) {
    //     return storageService.getPreviewImg(id);
    // }

    @PostMapping("/save-file")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,
        RedirectAttributes redirectAttributes) {

        storageService.store(file); // This will save the file to the database
        redirectAttributes.addFlashAttribute("message",
                "You successfully uploaded " + file.getOriginalFilename() + "!");

        // return "redirect:/";
        return "You successfully uploaded " + file.getOriginalFilename() + "!";
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }

}
