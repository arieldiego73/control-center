package com.controlcenter.controlcenter.service.serviceImpl;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import com.controlcenter.controlcenter.dao.StoredFileDao;
import com.controlcenter.controlcenter.model.StoredFileInput;
import com.controlcenter.controlcenter.model.StoredFileOutput;
import com.controlcenter.controlcenter.model.UserOutput;
import com.controlcenter.controlcenter.service.StoredFileService;
import com.controlcenter.controlcenter.shared.StorageException;
import com.controlcenter.controlcenter.shared.StorageFileNotFoundException;

@Service
public class StoredFileServiceImpl implements StoredFileService {

	@Autowired
	public StoredFileDao storedFileDao;

	@Autowired
	public StoredFileServiceImpl(StoredFileDao storedFileDao) {
		this.storedFileDao = storedFileDao;
	}

	@Override
	public List<StoredFileOutput> getAllFiles() {
		return storedFileDao.getAllFiles();
	}

	// @Override
	// public StoredFileOutput getByProfileId(Long profile_id) {
	// 	return storedFileDao.getByProfileId(profile_id);
	// }

	@Override
	public StoredFileOutput getFileByFilename(String filename, String id, String emp_id) {
		return storedFileDao.getFileByFilename(filename, id, emp_id);
	}

	@Override
	public void store(MultipartFile file) {
		try {
			if (file.isEmpty()) {
				throw new StorageException("Failed to store empty file.");
			}

			String filename = StringUtils.cleanPath(file.getOriginalFilename());
			String filetype = file.getContentType();
			byte[] img_src = file.getBytes();

			StoredFileInput storedFileInput = new StoredFileInput();
			UserOutput emp_id = new UserOutput();

			storedFileInput.setFilename(filename);
			storedFileInput.setFiletype(filetype);
			storedFileInput.setImg_src(img_src);
			storedFileInput.setEmp_id("108");

			storedFileDao.store(storedFileInput); // Save to the database
		} catch (IOException e) {
			throw new StorageException("Failed to store file.", e);
		}
	}

	@Override
	public Stream<Path> loadAll() {
		try {
			// Assuming you have a method in StoredFileDao to retrieve all files from the
			// database
			List<StoredFileOutput> files = storedFileDao.getAllFiles();

			// Map each file to a Path (or another suitable representation)
			return files.stream()
					.map(file -> Paths.get(file.getFilename())); // Modify this mapping as per your actual database
																	// structure

		} catch (Exception e) {
			throw new StorageException("Failed to read stored files", e);
		}
	}

	@Override
	public Path load(String filename) {
		// Assuming you have a method in StoredFileDao to fetch a file by its filename
		String id = "4";
		String emp_id = "101";
		StoredFileOutput file = storedFileDao.getFileByFilename(filename, id, emp_id);

		if (file != null) {
			// You might need to modify this part depending on how you handle file content
			// Create a temporary file with the content and return its path
			try {
				Path tempFile = Files.createTempFile("temp", ".tmp");
				Files.write(tempFile, file.getImg_src());
				return tempFile;
			} catch (IOException e) {
				throw new StorageException("Failed to load file: " + filename, e);
			}
		} else {
			throw new StorageFileNotFoundException("File not found: " + filename);
		}
	}

	@Override
	public Resource loadAsResource(String filename) {
		try {
			// Assuming you have a method in StoredFileDao to fetch a file by its filename
			String id = "4";
			String emp_id = "101";
			StoredFileOutput file = storedFileDao.getFileByFilename(filename, id, emp_id);

			if (file != null) {
				// Wrap the file content in a ByteArrayResource
				Resource resource = new ByteArrayResource(file.getImg_src());
				return resource;
			} else {
				throw new StorageFileNotFoundException("Could not read file: " + filename);
			}
		} catch (Exception e) {
			throw new StorageFileNotFoundException("Could not read file: " + filename, e);
		}
	}

	@Override
	public ResponseEntity<Resource> previewFile(String filename, String id, String emp_id) {
        // Retrieve the file content from the database based on the filename
        StoredFileOutput file = storedFileDao.getFileByFilename(filename, id, emp_id);

        if (file != null) {
            // Create a ByteArrayResource from the file content
            ByteArrayResource resource = new ByteArrayResource(file.getImg_src());

            // Set the appropriate content type based on the file type (e.g., image/jpeg,
            // application/pdf, etc.)
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(file.getFiletype()));

            // Return the file content as a response
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(resource.contentLength())
                    .body(resource);
        } else {
            // Handle the case when the file is not found
            return ResponseEntity.notFound().build();
        }
    }

	// @Override
	// public ResponseEntity<byte[]> getPreviewImg(Long id) {
    //     // Retrieve the image data from the database using your DAO or service
    //     byte[] imageData = storedFileDao.getPreviewImg(id);

    //     HttpHeaders headers = new HttpHeaders();
    //     headers.setContentType(MediaType.IMAGE_JPEG); // Set the appropriate content type

    //     // Return the image data as a response
    //     return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
    // }

	// @Override
	// public void deleteAll() {
	// FileSystemUtils.deleteRecursively(storedFileDao.toFile());
	// }

	// @Override
	// public void init() {
	// try {
	// Files.createDirectories(storedFileDao);
	// } catch (IOException e) {
	// throw new StorageException("Could not initialize storage", e);
	// }
	// }
}
