import fs from 'fs';
import path from 'path';

export async function GET() {
  const tracksDirectory = path.join(process.cwd(), 'public', 'tracks'); // Assuming audio files are in public/tracks
  try {
    const files = await fs.promises.readdir(tracksDirectory);
    const trackFiles = files.filter(file => file.endsWith('.mp3')).map(file => ({
      title: file.replace('.mp3', ''), // Remove the file extension for the title
      src: `/tracks/${file}`, // Path to the audio file in public
    }));

    return new Response(JSON.stringify(trackFiles), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error reading tracks:', error);
    return new Response(JSON.stringify({ error: 'Failed to load tracks' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
