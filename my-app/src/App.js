import imageCompression from "browser-image-compression";

function App() {
  async function handleImageUpload(event) {
    const imageFile = event.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {

      const compressedFile = await imageCompression(imageFile, options);

      const formData = new FormData();
      formData.append("File", compressedFile);

      await fetch("http://localhost:7000/upload", {
        method: "POST",
        body: formData,
        headers: {
          name: compressedFile.name,
        },
      })
        .then((result) => {
          console.log("Success:", result);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <input name="foo" type="file" onChange={handleImageUpload} />
    </div>
  );
}

export default App;