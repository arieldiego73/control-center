package com.controlcenter.controlcenter.model;

import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoredFileOutput {
    private Long profile_id;
    private String emp_id;

    // @NotBlank(message = "Filename should not be empty.")
    @Size(max = 150)
    private String filename;

    // @NotBlank(message = "Filetype should not be empty.")
    @Size(max = 150)
    private String filetype;


    private byte[] img_src;
    private int del_flag;
}
