import { defineStore } from 'pinia';

export const useGlobalDragging = defineStore('globalDragging', () => {
  const isDragging = ref(false);
  let dragCounter = 0; // helps when multiple dragenter/leave events fire

  function onDragEnter(e: DragEvent) {
    dragCounter++;
    if (e.dataTransfer?.types.includes('Files')) {
      isDragging.value = true;
    }
  }

  function onDragLeave() {
    dragCounter--;
    if (dragCounter === 0) {
      isDragging.value = false;
    }
  }

  function onDrop() {
    isDragging.value = false;
    dragCounter = 0;
  }

  document.body.addEventListener('dragenter', onDragEnter);
  document.body.addEventListener('dragleave', onDragLeave);
  document.body.addEventListener('drop', onDrop);

  return {
    isDragging,
  };
});
