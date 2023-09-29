package com.controlcenter.controlcenter.service;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import com.controlcenter.controlcenter.model.StoredFileInput;
import com.controlcenter.controlcenter.model.StoredFileOutput;

import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

public interface StoredFileService {

	// public void init();

	public void store(MultipartFile file);

	public List<StoredFileOutput> getAllFiles();

	public StoredFileOutput getFileByFilename(String filename, String id, String emp_id);

	public ResponseEntity<Resource> previewFile(String filename, String id, String emp_id);

	public Stream<Path> loadAll();

	public Path load(String filename);

	public Resource loadAsResource(String filename);

	// public void deleteAll();

}
