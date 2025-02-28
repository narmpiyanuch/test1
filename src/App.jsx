import { useState } from 'react'
import JSZip from "jszip";


function App() {
  const [files, setFiles] = useState([])

  const handleUploadFile = (e) => {
    const saveFiles = Array.from(e.target.files);
    setFiles(saveFiles);
  }

  const handleDownloadZipFile = () => {
    const zip = new JSZip();
    files.forEach((f) => {
      zip.file(f.name, f);
    });
    zip.generateAsync({ type: "blob" }).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = "files.zip";
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };


  return (
    <div style={{ padding: '10px' }}>
      <h2>Zip File</h2>
      <div>
        <input type='file' multiple onChange={handleUploadFile} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleDownloadZipFile}>
          Download
        </button>
      </div>
    </div>
  )
}

export default App
