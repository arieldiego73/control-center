import * as React from "react";

function ImagePreview() {
    // Replace with the actual image filename
    const filename = "kokomi.jpg"; // Replace with the actual filename
    const id = "2";
    const emp_id = "107";

    // Construct the image URL
    const imageUrl = `http://localhost:8080/profile/preview/${filename}/${id}/${emp_id}`;

    return (
        <div>
            <h1>Image Preview</h1>
            {/* Use the imageUrl variable for the src attribute */}
            <img
                id="image-preview"
                src={imageUrl}
                alt="Sample"
            />
        </div>
    );
}

export default ImagePreview;
