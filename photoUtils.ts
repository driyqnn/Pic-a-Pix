// Function to get user media with specified constraints
export const getUserMedia = async (
  constraints: MediaStreamConstraints
): Promise<MediaStream> => {
  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (error) {
    console.error("Error accessing media devices:", error);
    throw new Error(
      "Could not access camera. Please check permissions and try again."
    );
  }
};

// Function to get available video devices (cameras)
export const getVideoDevices = async (): Promise<MediaDeviceInfo[]> => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === "videoinput");
  } catch (error) {
    console.error("Error enumerating devices:", error);
    return [];
  }
};

// Fixed type definition for photos
export const createPhotoStrip = (
  template: HTMLImageElement,
  photos: (HTMLCanvasElement | null)[],
  photoPositions: { x: number; y: number; width: number; height: number }[]
): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = template.width;
    canvas.height = template.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get canvas context");
    }

    // Draw the template background
    ctx.drawImage(template, 0, 0);

    // Draw each photo onto the canvas at the specified position
    photos.forEach((photo, index) => {
      if (!photo) return;

      const position = photoPositions[index];
      if (!position) return;

      ctx.drawImage(
        photo,
        position.x,
        position.y,
        position.width,
        position.height
      );
    });

    // Add watermark at the bottom
    const currentDate = new Date().toLocaleDateString();

    // Bottom left: Pic-a-Pix
    ctx.font = "bold 20px Playfair Display, sans-serif";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";
    ctx.fillText("Pic-a-Pix", 25, template.height - 25);

    // Bottom right: Date
    ctx.textAlign = "right";
    ctx.fillText(currentDate, template.width - 25, template.height - 25);

    // Center bottom: Website URL
    ctx.textAlign = "center";
    ctx.font = "14px Inter, sans-serif";
    ctx.fillText(
      "pic-a-pix.vercel.app",
      template.width / 2,
      template.height - 10
    );

    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL("image/png");
    resolve(dataUrl);
  });
};

// Function to capture a photo from a video element, with orientation fix
export const capturePhoto = (video: HTMLVideoElement): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  // Draw the video frame to the canvas - fix orientation by flipping horizontally
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0);

  // Reset transform
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  return canvas;
};

// Function to download the photo strip
export const downloadPhotoStrip = (
  dataUrl: string,
  filename = "pic-a-pix-photostrip.png"
): void => {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Check if the device is mobile
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Check if the device is a tablet or larger
export const isTabletOrLarger = (): boolean => {
  return window.innerWidth >= 768; // 768px is a common breakpoint for tablets
};

// Function to auto-capture multiple photos with delay
export const startAutoCapture = (
  videoElement: HTMLVideoElement,
  numPhotos: number,
  delayBetweenPhotos: number,
  onCapture: (photo: HTMLCanvasElement, index: number) => void,
  onComplete: () => void
): void => {
  let currentIndex = 0;

  const captureNextPhoto = () => {
    if (currentIndex >= numPhotos) {
      onComplete();
      return;
    }

    const photo = capturePhoto(videoElement);
    onCapture(photo, currentIndex);
    currentIndex++;

    if (currentIndex < numPhotos) {
      setTimeout(captureNextPhoto, delayBetweenPhotos);
    } else {
      onComplete();
    }
  };

  // Start the capture sequence
  captureNextPhoto();
};

// Function to create a photo from a File
export const createPhotoFromFile = (file: File): Promise<HTMLCanvasElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      // Set appropriate dimensions while maintaining aspect ratio
      const MAX_SIZE = 1280;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_SIZE) {
          height = Math.round(height * (MAX_SIZE / width));
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width = Math.round(width * (MAX_SIZE / height));
          height = MAX_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas);
    };

    img.onerror = () => {
      reject(new Error("Could not load image"));
    };

    img.src = URL.createObjectURL(file);
  });
};
