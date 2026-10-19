import HomeHero from "./components/home-hero/home-hero";
import Continue from "./components/continue/continue";
import Bento from "./components/bento/bento";
import VideoStrip from "./components/video-strip/video-strip";
import Contact from "./components/contact/contact";

// Academy bosh sahifasi — "Kabinet ichidan sayohat"ning kirish eshigi. Ritm:
// to'liq ekran teal hero (video devori) → zich "davom ettirish" → keng bento → video lenta → sariq "Savol qoldimi?"
export default function AcademyHome() {
  return (
    <>
      <HomeHero />
      <Continue />
      <Bento />
      <VideoStrip />
      <Contact />
    </>
  );
}
