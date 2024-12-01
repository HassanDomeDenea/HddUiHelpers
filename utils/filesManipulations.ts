export async function rotateImageFile(file: File, rotationAngle: 0): Promise<File> {
  return new Promise<File>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result !== 'string') {
        return reject(new Error('Failed to read the file as a data URL.'))
      }

      const image = new Image()
      image.src = result
      image.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          return reject(new Error('Failed to get canvas context.'))
        }

        // Adjust canvas size to fit the rotated image
        const radians = rotationAngle * (Math.PI / 180)

        // Calculate new canvas size depending on the rotation
        const width = image.width
        const height = image.height

        if (rotationAngle % 180 === 90) {
          // Swap width and height if rotated by 90 or 270 degrees

          // noinspection JSSuspiciousNameCombination
          canvas.width = height
          // noinspection JSSuspiciousNameCombination
          canvas.height = width
        }
        else {
          canvas.width = width
          canvas.height = height
        }

        // Step 3: Draw the rotated image on the canvas
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate(radians)
        ctx.drawImage(image, -image.width / 2, -image.height / 2)
        ctx.rotate(-radians) // Reset rotation

        // Step 4: Convert canvas content to a Blob and then to a File
        canvas.toBlob((blob: Blob | null) => {
          if (blob) {
            const rotatedFile = new File([blob], file.name, { type: file.type })
            resolve(rotatedFile)
          }
          else {
            reject(new Error('Failed to convert canvas to file.'))
          }
        }, file.type)
      }

      image.onerror = () => {
        reject(new Error('Failed to load image.'))
      }
    }

    reader.onerror = () => {
      reject(new Error('Failed to read the file.'))
    }

    reader.readAsDataURL(file)
  })
}
export function canvasToFile(canvas: HTMLCanvasElement, fileName: string = 'image.png', mimeType: string = 'image/png'): Promise<File> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], fileName, { type: mimeType })
        resolve(file)
      }
    }, mimeType)
  })
}
