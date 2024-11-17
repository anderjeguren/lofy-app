import AudioController from "./components/audioController/AudioController";

export default function Home() {
  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      zIndex: 1000, // Optional: Ensures the component is on top of other elements
    }}>
      <AudioController />
    </div>
  );
}
