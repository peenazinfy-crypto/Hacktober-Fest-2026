/**
 * Resizes and optimizes an image file before uploading to avoid huge payloads,
 * slow network transfers, and model image decoding errors.
 */
export async function optimizeImageForAnalysis(
  file: File,
  maxDimension: number = 1024,
  quality: number = 0.85
): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Failed to read image file.'));
    };

    reader.onload = (e) => {
      const img = new Image();

      img.onerror = () => {
        reject(new Error('Failed to parse image for optimization.'));
      };

      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Downscale while preserving aspect ratio if dimensions exceed maxDimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to initialize 2D canvas context.'));
          return;
        }

        // Fill solid background in case of transparent PNG/WebP to prevent visual artifacts
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Export as standard JPEG (guaranteed RGB format compatible with Gemma vision encoder)
        const mimeType = 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, quality);
        const base64 = dataUrl.replace(/^data:image\/jpeg;base64,/, '');

        resolve({ base64, mimeType });
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
