package com.controlcenter.controlcenter.shared.upload_picture;

public class SharedStorageFileNotFoundException extends SharedStorageException {

	public SharedStorageFileNotFoundException(String message) {
		super(message);
	}

	public SharedStorageFileNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}
}
