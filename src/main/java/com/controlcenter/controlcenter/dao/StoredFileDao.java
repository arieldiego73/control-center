package com.controlcenter.controlcenter.dao;

import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.core.io.Resource;

import com.controlcenter.controlcenter.model.StoredFileInput;
import com.controlcenter.controlcenter.model.StoredFileOutput;

@Mapper
public interface StoredFileDao {
    // void init();

	void store(StoredFileInput storedFileInput);

    List<StoredFileOutput> getAllFiles();

    StoredFileOutput getFileByFilename(String filename, String id, String emp_id);

	Stream<Path> loadAll();

	Path load(String filename);

	Resource loadAsResource(String filename);

	// void deleteAll();
}
