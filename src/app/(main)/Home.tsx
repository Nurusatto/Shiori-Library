import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { BookGallery } from "@/widgets/BookGallery";
import { BookHistory } from "@/widgets/BookHistory";
import { Hello } from "@/widgets/Hello";
import styles from "./home.module.scss";
import { Footer } from "@/widgets/Footer";

export const HomePage = () => {
  return (
    <main className={styles.home}>
      <div className={`container ${styles.content}`}>
        <Hello />
        <BookHistory />
        <BookGallery />
        <section className={styles.assistant} aria-labelledby="assistant-title">
          <div className={styles.assistantIcon}>
            <Sparkles size={25} strokeWidth={1.5} />
          </div>
          <div className={styles.assistantCopy}>
            <span className={styles.eyebrow}>MEET YOUR READING COMPANION</span>
            <h2 id="assistant-title">
              A good book starts with a conversation.
            </h2>
            <p>
              Tell Shiori what you love. Find something you didn’t know you were
              looking for.
            </p>
          </div>
          <Link href="/AI" className={styles.assistantLink}>
            Ask Shiori <ArrowRight size={17} />
          </Link>
        </section>
        <Footer type="shioriFlower" />
      </div>
    </main>
  );
};
