package com.controlcenter.controlcenter.shared.upload_picture;

public class SharedStorageException extends RuntimeException {

	public SharedStorageException(String message) {
		super(message);
	}

	public SharedStorageException(String message, Throwable cause) {
		super(message, cause);
	}
}
