import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Button } from './components/Button';
import { Suspense } from 'react';
import { Loader } from './components/Loader';
import { DndContext } from '@dnd-kit/core';
import { Droppable } from './components/Droppable';

function App() {
  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke('greet', { name }));
  // }

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  return (
    <Suspense fallback={<Loader />}>
      <div className="flex flex-col items-center my-10 gap-y-5">
        <div className="flex items-center gap-x-4 w-9/12 mb-10">
          <h1>Welcome to Tauri Image Converter</h1>
          <img src="./tauri.svg" className="w-20 h-20" alt="Tauri Logo" />
        </div>
        <DndContext>
          <Droppable />
        </DndContext>
        <p>
          You can drag in your image to convert it or click the button to upload
          it.
        </p>
        <div className="flex items-center gap-x-4">
          <Button>
            <input
              type="file"
              name="myImage"
              onChange={(e) => {
                if (!e.target.files) return;
                console.log(e.target.files[0]);
                setSelectedImage(e.target.files[0]);
              }}
            />
          </Button>
          <Button>Convert</Button>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
