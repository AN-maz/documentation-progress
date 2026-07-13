// Ubah import ini sesuai dengan materi yang sedang kamu pelajari/test
import BelajarJSX from './lessons/01-Dasar-Komponent/BelajarJSX';
import StateProps from './lessons/01-Dasar-Komponent/StateProps';
import ConditionalRendering from './lessons/01-Dasar-Komponent/ConditionalRender';
import Composition from './lessons/01-Dasar-Komponent/Composition';
// import Lifecycle from './lessons/02-Rendering/Lifecycle';

export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">
        Buku Catatan React ⚛️
      </h1>
      
      {/* Tampilkan komponen yang sedang diaktifkan di sini */}
      <BelajarJSX />
      <StateProps />
      <ConditionalRendering />
      <Composition />
      {/* <Lifecycle /> */}
    </div>
  );
}