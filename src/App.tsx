import { useCallback, useState } from "react";
import { profile } from "./data/portfolio";
import type { Work } from "./data/portfolio";
import { CursorField, Footer, Nav, ScrollProgress } from "./components/Chrome";
import { Hero } from "./components/Hero";
import { Lightbox } from "./components/Lightbox";
import {
  CapabilitySection,
  ContactSection,
  ProjectSection,
  ServiceSection,
  WorkSection,
} from "./components/Sections";

export default function App() {
  const [active, setActive] = useState<Work | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <a className="skip-link" href="#work">
        跳到作品
      </a>
      <ScrollProgress />
      <CursorField />
      <Nav />
      <main>
        <Hero />
        <WorkSection onOpen={setActive} />
        <ProjectSection />
        <ServiceSection />
        <CapabilitySection />
        <ContactSection />
      </main>
      <Footer phone={profile.phone} email={profile.email} github={profile.github} />
      <Lightbox work={active} onClose={close} />
    </>
  );
}
