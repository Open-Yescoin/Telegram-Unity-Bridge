export function importScript(url: string, type?: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.type = type || 'text/javascript';
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export function loadImage(url: string, crossOrigin = 'anonymous') {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.crossOrigin = crossOrigin;
    image.onload = (event) => resolve(event.target);
    image.onerror = reject;
  });
}
