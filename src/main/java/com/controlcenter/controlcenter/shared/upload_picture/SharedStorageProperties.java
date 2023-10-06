package com.controlcenter.controlcenter.shared.upload_picture;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("storage")
public class SharedStorageProperties {

	/**
	 * Folder location for storing files
	 */
	private String location = "temp_profile";

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

}
