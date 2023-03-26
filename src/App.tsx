import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Button } from './components/Button';
import { Suspense } from 'react';
import { Loader } from './components/Loader';
import { DndContext } from '@dnd-kit/core';
import { Droppable } from './components/Droppable';

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageInfo, setImageInfo] = useState<string | null>(null);

  const { name } = selectedImage ?? { name: '' };

  const handleConvert = async () => {
    setImageInfo(await invoke('read_file', { name }));
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="mx-auto my-10 w-9/12">
        <div className="flex flex-col items-center gap-y-10">
          <div className="flex items-center gap-x-6 mb-10">
            <h1>Welcome to Tauri Image Converter</h1>
            <img src="./tauri.svg" className="w-20 h-20" alt="Tauri Logo" />
          </div>
          <DndContext>
            <Droppable />
          </DndContext>
          <p>
            You can drag in your image to convert it or click the button to
            upload it.
          </p>
          <div className="flex items-center gap-x-4">
            <Button>
              <input
                type="file"
                name="myImage"
                onChange={(e) => {
                  if (!e.target.files) return;
                  console.log(e.target.files[0]);
                  console.log(e.target.files[0].name);
                  setSelectedImage(e.target.files[0]);
                }}
              />
            </Button>
            <Button onClick={handleConvert}>Convert</Button>
          </div>
          {imageInfo && <p>{imageInfo}</p>}
        </div>
      </div>
    </Suspense>
  );
}

export default App;
